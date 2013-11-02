# Function: Translate a page from some language to another and extract the main content part from the page.
# Author: Emerson
# Author URL: http://www.latpaw.me
#
#
#
# Help: irb > load "pages.rb"
#       irb > tran  // this make the translation from all to en, and the site is set to self.It will make a dir 
#                      in the current path with the name of en.
# You can use it this way too:
#       irb > load "pages.rb"
#       irb > tran("fr")
#
#
#

require 'nokogiri'
require 'open-uri'
require 'mechanize'
require 'fileutils'

class Tran
  def main(url)
    a = Mechanize.new do |agent|
      agent.user_agent_alias = 'Mac Safari'
      #agent.set_proxy("127.0.0.1",8087)
    end

    a.get(url) do |page|
        doc = Nokogiri::HTML.parse page.content
        doc.search(".google-src-text").each do |src|
            span = src.parent
            span.remove_attribute("onmouseover")
            span.remove_attribute("onmouseout")
            span.name = ""
            src.remove
        end
        doc.search("a").each do |link|
            linksplit = link["href"].split("=")
            linksplit.each do |http|
               if http.index("http") && !http.index("google")
                 linknew = http.gsub(/&usg/,"")
                 link["href"] = linknew
               end
            end
        end

        doc.search("script").each do |sc|
            scs = sc.to_s
            if scs.index("translate") || scs.index("responseStart") || scs.index("_setupIW")
                sc.remove
            else
            end
        end

        doc.search("style").each do |st|
            sts = st.to_s
            if sts.index("google-src")
                st.remove
            end
        end

        doc.search("meta").each do |st|
            sts = st.to_s
            if sts.index("Google") || sts.index("description") || sts.index("keywords")
                st.remove
            end
        end

        doc.search("link").each do |st|
            sts = st.to_s
            if sts.index("hreflang")
                st.remove
            end
        end
        doc.search("base").each do |st|
                st.remove
        end  
        doc.search("iframe").each do |st|
                st.remove
        end
        doc.search("body").each do |ol|
                ol.remove_attribute("onload")
        end

        htmls = doc.to_html
        htmls.gsub!(/<>/,"")
        htmls.gsub!(/<\/>/,"")
        return htmls
     
    end
   end
end

def tran(lan="en",site=nil)
    i = 0
    alline = IO.readlines("links")
    linum = alline.size 
    IO.foreach("links") do |line|
        line = line.chop
        # newspider = Spider.new
        unless line.nil?
         unless line.index("news")
            tt = Tran.new
            result =tt.main(line)
            fh = File.open("ab.html","w")
            fh.puts(result)
            fh.close
            #docr = Nokogiri::HTML(result)

###############################可编辑部分############################################

            #docr.css('.art_list').each do |cont| #截取主要内容部分
              #cont.search("a").each do |a| #去除链接
                #a.replace(a.content)
              #end
              #cont.search('.art_list_title') do |t|
                #h1title = t.content
              #end
              #cont.search("table").each do |ta| #删除表格
               # ta.remove
              #end
              #cont.search("img").each do |im| #删除图片
                #im.remove
              #end
              #cont.last_element_child.remove #去除最后一个节点
              #$result = cont.to_html
              #p $result
            #end
#################################结束####################################################


           # result.gsub!(/metso|sandvik|terex|symons|shanbao|shan bao|sbm|shibang|liming|zenith|henan|thailand/i,"")
           # result.gsub!(/[\w]+@[\w]+.(com|net|org|cn)/,"")
           # result.gsub!(/[\d]{4,12}/,"")
           # unless result.nil?
           #    Post.create(:name=>h1title,:content=>result,:title=>h1title)
           # end
           # i=i+1
           # per = i*100/linum
           # puts "The translation has been #{i} lines, about #{per}%, into #{rpath}"
           # sleep(10)
         end
        end
    end
    return "Complete to #{lan}, Congratulations !! "
end
