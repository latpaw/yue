require "spidr"
require "nokogiri"
require "open-uri"

 url = ARGV[0]
  # p url
 links = Set[]
 Spidr.site(url) do |site|
 	site.every_html_page do |page|
 		links << page.url
 	end
 end
  		links.each do |link|
        end

builder = Nokogiri::XML::Builder.new do |xml|
	xml.urlset("xmlns"=>"http://www.sitemaps.org/schemas/sitemap/0.9","xmlns:xsi"=>"http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation"=>"http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"){
        links.each do |link|
        xml.url{
        	xml.loc link
        }
    end
    }
end
 
  		fi = File.open("sitemap.xml","w")
  		   fi.puts(builder.to_xml)
        fi.close