require "nokogiri"
builder = Nokogiri::XML::Builder.new do |xml|
	xml.urlset("xmlns"=>"http://www.sitemaps.org/schemas/sitemap/0.9","xmlns:xsi"=>"http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation"=>"http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"){
    IO.foreach("links") do |line|
        line = line.chop
        xml.url{
        	xml.loc line
        }
    end
    }
end
puts builder.to_xml