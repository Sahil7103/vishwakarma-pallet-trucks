#!/usr/bin/env python3
"""Dependency-free crawl and metadata checks. Optional --baseline verifies visual preservation."""
import argparse,html,json,re,subprocess,sys
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin,urlsplit,unquote
from xml.etree import ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]
BASE='https://vishwakarmapallettrucks.in/'
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__();self.tags=[];self.feed(text)
 def handle_starttag(self,tag,attrs):self.tags.append((tag,dict(attrs)))
 def attrs(self,tag,**match):return [a for t,a in self.tags if t==tag and all(a.get(k)==v for k,v in match.items())]
def run(baseline=None):
 errors=[];titles=set();descs=set();urls=set();count=0
 page_map=json.loads((ROOT/"docs/seo-page-map.json").read_text())
 def check(ok,msg):
  if not ok:errors.append(msg)
 for p in sorted(ROOT.glob('**/index.html')):
  if '.git' in p.parts:continue
  rel=p.relative_to(ROOT);text=p.read_text();page=Page(text);count+=1
  route='' if rel==Path('index.html') else str(rel.parent)+'/'
  url=BASE+route;urls.add(url)
  title=re.findall(r'<title>(.*?)</title>',text,re.S)
  check(len(title)==1 and bool(title[0].strip()),f'{rel}: one nonempty title required')
  if title:check(title[0] not in titles,f'{rel}: duplicate title');titles.add(title[0])
  description=page.attrs('meta',name='description')
  check(len(description)==1 and bool(description[0].get('content')),f'{rel}: description required')
  if description:
   desc=description[0].get('content');check(desc not in descs,f'{rel}: duplicate description');descs.add(desc)
  check(route in page_map and title and [html.unescape(title[0]),description[0].get('content') if description else None]==page_map.get(route),f'{rel}: metadata differs from page map')
  canon=page.attrs('link',rel='canonical');check(len(canon)==1 and canon[0].get('href')==url,f'{rel}: canonical mismatch')
  og=page.attrs('meta',property='og:url');check(len(og)==1 and og[0].get('content')==url,f'{rel}: og:url mismatch')
  check(len(page.attrs('h1'))==1,f'{rel}: expected one h1')
  for meta in page.attrs('meta'):
   if meta.get('name','').lower() in ('robots','googlebot'):check('noindex' not in meta.get('content','').lower(),f'{rel}: noindex set')
  schemas=re.findall(r'<script type="application/ld\+json">(.*?)</script>',text,re.S)
  check(bool(schemas),f'{rel}: missing schema')
  for raw in schemas:
   try:
    schema=json.loads(raw);graph=schema.get('@graph',[])
    check(any(n.get('@id')==url+'#webpage' for n in graph),f'{rel}: missing page entity')
    ids={n.get('@id') for n in graph}
    images={}
    for a in page.attrs('img'):images.setdefault(urljoin(url,a['src']),set()).add(a.get('alt'))
    for n in graph:
     if n.get('@type')=='ImageObject':
      check(n.get('contentUrl') in images,f'{rel}: schema image not present on page')
      check(n.get('caption') in images.get(n.get('contentUrl'),set()),f'{rel}: schema image caption differs from alt')
     if n.get('@type') in ('WebPage','CollectionPage'):
      for key in ('primaryImageOfPage','mainEntity','breadcrumb'):
       if key in n:check(n[key].get('@id') in ids,f'{rel}: unresolved {key}')
     if n.get('@type')=='ItemList':
      items=n.get('itemListElement',[])
      links={urljoin(url,a.get('href','')) for a in page.attrs('a')}
      check(n.get('numberOfItems')==len(items) and len(items)>0,f'{rel}: catalogue count')
      check([x.get('position') for x in items]==list(range(1,len(items)+1)),f'{rel}: catalogue positions')
      check(all(x.get('item',{}).get('url') in links for x in items),f'{rel}: catalogue item missing visible link')
      check(len({x.get('item',{}).get('url') for x in items})==len(items),f'{rel}: duplicate catalogue items')
     if n.get('@type')=='BreadcrumbList':
      items=n['itemListElement'];check([x['position'] for x in items]==list(range(1,len(items)+1)),f'{rel}: breadcrumb positions')
      check(all(x['item'] in {BASE,BASE+'products/',url} for x in items),f'{rel}: breadcrumb URL')
   except (ValueError,KeyError,TypeError) as e:errors.append(f'{rel}: invalid JSON-LD {e}')
  for tag,a in page.tags:
   for attr in ('href','src'):
    value=a.get(attr,'');u=urlsplit(urljoin(url,value))
    if not value or u.scheme not in ('http','https') or u.netloc!=urlsplit(BASE).netloc:continue
    target=ROOT/unquote(u.path).lstrip('/')
    if u.path.endswith('/'):target=target/'index.html'
    check(target.is_file(),f'{rel}: missing local resource {value}')
    if u.fragment and target.suffix=='.html' and target.is_file():
     ids={a.get('id') for _,a in Page(target.read_text()).tags}
     check(u.fragment in ids,f'{rel}: broken fragment {value}')
  for img in page.attrs('img'):check('alt' in img,f'{rel}: image missing alt')
  if baseline:
   old=subprocess.check_output(['git','show',f'{baseline}:{rel}'],cwd=ROOT,text=True)
   check(old.split('</head>',1)[1]==text.split('</head>',1)[1],f'{rel}: BODY CHANGED')
 sitemap=ET.parse(ROOT/'sitemap.xml');listed=[n.text for n in sitemap.findall('.//{*}loc')]
 check(set(listed)==urls and len(listed)==len(urls),'sitemap differs from canonical pages')
 robots=(ROOT/'robots.txt').read_text();check('Sitemap: '+BASE+'sitemap.xml' in robots,'robots sitemap mismatch')
 check(not re.search(r'^Disallow:\s*/\s*$',robots,re.M),'robots blocks site')
 check((ROOT/'CNAME').read_text().strip()==urlsplit(BASE).netloc,'CNAME mismatch')
 if baseline:
  changed=subprocess.check_output(['git','diff','--name-only',baseline,'--','assets','*.css','*.js'],cwd=ROOT,text=True).strip()
  check(not changed,'Visual assets/styles/scripts changed: '+changed)
 if errors:print('\n'.join(errors));return 1
 print(f'PASS: {count} pages; unique metadata, canonicals, schema, sitemap, links and images'+('; bodies and visual files unchanged' if baseline else ''))
 return 0
if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('--baseline');args=parser.parse_args();sys.exit(run(args.baseline))
