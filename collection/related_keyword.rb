require 'nokogiri'
require 'open-uri'
require 'mechanize'

class Spider
  def main(keyword)
     @keyword = keyword
     a = Mechanize.new { |agent|
      agent.user_agent_alias = 'Mac Safari'
     }

    a.get("http://www.bing.com/search?q=#{keyword}") do |doc|
     vars = Array.new
     i=0
     doc.search('.qscolumn').each do |content|
        content.search('a').each do |a|
         vars[i]=a.content         
         i=i.succ
        end
     end
      return vars
    end
    
  end

end

class Key
    def self.word(keyword)
        newhtml = Array.new
        i=0
        keyword.each do |line|
            newspider = Spider.new
            newhtml[i] = newspider.main(line)
        end
        return newhtml
    end

    def loop(keyword)
         return result = self.word(keyword)
    end

end



