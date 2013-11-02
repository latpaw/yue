require "spidr"
require "nokogiri"
require "open-uri"

url = "http://"+ARGV[0]
Spidr.site(url) do |site|
  #line_num = 1
  site.every_html_page do |page|
    if page.is_ok?
      #p line_num + page.url
      #line_num++
      url =page.url.to_s
      unless url.index("/application/")
        unless url.index("/crushers/")
      fi = File.open("links","a")
      fi.puts(page.url)
      fi.close
      p page.url
        end
      end
    end
  end
end

