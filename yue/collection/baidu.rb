require "mechanize"

a = Mechanize.new{|agent|
  agent.user_agent_alias = "Mac Safari"
}
a.get("http://www.baidu.com/") do |page|
  sr = page.form_with("f") do |f|
    f.wd = "Auto Expo India 2014"
  end.submit
  sr.search(".f").each do |ff|
    ff.search(".g").each do |gg|
       if gg.content.index("jrj.com") 
         ff.search("a").each do |link|
           ss = a.click(link)
           p ss.title
         end
       end
    end
  end
end

