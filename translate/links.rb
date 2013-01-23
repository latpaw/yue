require "spidr"
require "nokogiri"
require "open-uri"

 url = ARGV[0]
  # p url
 links = Set[]
 Spidr.site(url,:ignore_links=>[/news/]) do |site|
 	site.every_html_page do |page|
 		if page.is_ok?
 		    links << page.url
 		    p page.url
 	     end
 	end
 end
  		fi = File.open("links","a")
  		links.each do |link|
  		   fi.puts(link)
         end
         fi.close