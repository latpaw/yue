require "spidr"
require "nokogiri"
require "open-uri"

 url = "http://portable-crusher.com"
 links = Set[]
 Spidr.site(url) do |site|
 	site.every_html_page do |page|
 		links << page.url
 	end
 end
  		fi = File.open("links","a")
  		links.each do |link|
  		   fi.puts(link)
        end
        fi.close