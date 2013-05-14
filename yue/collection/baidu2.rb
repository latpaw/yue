require "mechanize"

def get_url url
  tmp = `curl -I #{url}`
  tmp.gsub!("\r\n",";")
  tmp = tmp.split(";")
  tmp = tmp[3]
  tmp.gsub!("Location:","")
  tmp.strip
end

proto = Array.new
IO.foreach("/Users/latpaw/a") do |line|
  proto << line.chop
end
proto = proto.join(";")
a = Mechanize.new{|agent|
  agent.user_agent_alias = "Mac Safari"
}
words = ["印度汽配展2014","印度汽车摩托车配件展","亚洲汽车配件展","Auto Expo India 2014","第十二届印度汽配展","2014印度汽配展"]
words.each do |word|
  word = word + " 18217120627"
  a.get("http://www.baidu.com/") do |page|
    sr = page.form_with("f") do |f|
      f.wd = word
    end.submit
    sr.search(".f").each do |ff|
      ex = ff.content.index("18217120627") || 0
      if ex > 0
        ff.search("a").each do |link|
          ss = a.click(link)
          p word,link.content,ss.title
        end
      end
      #ff.search(".g").each do |gg|
        #proto.each do |p|
          #if gg.content.index(p) 
            #ff.search("a").each do |link|
              #ss = a.click(link)
              #p ss.title
            #end
          #end
        #end
      #end
    end
  end
end


