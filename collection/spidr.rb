require "nokogiri"
require "spidr"
require "open-uri"
def yue
	Spidr.site("http://www.somedomain.com") do |spider|
		spider.every_html_page  do |page|
			name = page.title
			doc = Nokogiri::HTML(page.body)
	        doc.css(".left_content2").each do |a|
	          contents = a.content
	          Post.create(:name=>name,:content=>contents)
	        end
		end
	end
end