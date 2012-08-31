require "spidr"
require "nokogiri"
require "open-uri"

 links = Set[]
 Spidr.site("http://crusherstone.com") do |site|
 	site.every_html_page do |page|
 		links << page.url
 	end
 end
  		fi = File.open("links","a")
  		links.each do |link|
           fi.puts(link)
        end
        fi.close