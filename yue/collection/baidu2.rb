# coding:utf-8
require "mechanize"


<<<<<<< HEAD

def click_page a,word,x,sx
      sx.search(".f").each do |ff|
        ex = ff.content.index("274708108") || 0
        if ex > 0
          ff.search("h3 a").each do |link|
            ss = a.click(link).title rescue "网页出错"

            p word,link["href"],ss
            p x,"",""
          end
        end
      end
=======
proto = Array.new
IO.foreach("a") do |line|
  proto << line.chop
>>>>>>> 6615e746fc15230a830b7222f0eb812ea053f46c
end

a = Mechanize.new{|agent|
  agent.user_agent_alias = "Mac Safari"
}
<<<<<<< HEAD
words = ["印度新德里汽车配件展2014","印度汽车摩托车配件展","亚洲汽车配件展","Auto Expo India 2014","第十二届印度汽配展","2014印度汽配展","第12界印度国际汽车摩托车及零配件展览会"]
=======
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
        ff.search("h3 a").each do |link|
          ss = a.click(link).title rescue "网页出错"
          sleep 5
          p word,link["href"],ss
          p "",""
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
>>>>>>> 6615e746fc15230a830b7222f0eb812ea053f46c
(0..50).each do |x|
  words.each do |word|
    word = word + " 274708108"
    a.get("http://www.baidu.com/") do |page|
      sr = page.form_with("f") do |f|
        f.wd = word
      end.submit
      click_page a,word,x,sr
      s2 = a.click(sr.link_with(:text=>"2"))
      click_page a,word,x,s2
      s3 = a.click(sr.link_with(:text=>"3"))
      click_page a,word,x,s3
    end
  end
end

