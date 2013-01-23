require "nokogiri"
require "open-uri"
def ehow page
  links = ""
  url = "http://www.articlesbase.com/find-articles.php?q=crusher+machine&page=#{page}"
  doc = Nokogiri::HTML(open(url))
  doc.search(".title").each do |t|
    t.search("a").each do |a|
      p a["href"]
      links << a["href"]+"\n"
    end
  end
  #f=File.open("links","a")
  #f.puts(links)
  #f.close
end

#def ehow2
  #(1..67).to_a.map {|x| ehow x}
#end
