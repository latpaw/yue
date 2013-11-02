require "mechanize"



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
end

a = Mechanize.new{|agent|
  agent.user_agent_alias = "Mac Safari"
}
words = ["印度新德里汽车配件展2014","印度汽车摩托车配件展","亚洲汽车配件展","Auto Expo India 2014","第十二届印度汽配展","2014印度汽配展","第12界印度国际汽车摩托车及零配件展览会"]
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

