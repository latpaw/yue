require 'rubygems'
require 'mechanize'
require "nokogiri"

# cookie = ["SRCHHPGUSR"=>"NEWWND=1&NRSLT=-1&SRCHLANG=vi&AS=1","domain"=>"bing.com"]
a = Mechanize.new { |agent|
  agent.user_agent_alias = 'Mac Safari'
  # agent.cookie_jar.add!(cookie)
  cookie = Mechanize::Cookie.new("SRCHHPGUSR","NEWWND=1&NRSLT=-1&SRCHLANG=vi&AS=1")
   agent.cookie_jar.add("http://bing.com",cookie)
  agent.cookie_jar.each {|cookie| puts cookie}
}

# a.get('http://www.bing.com/account/web?sh=5&ru=%2f') do |page|
#    # set_page = a.click(page.link_with(:uri=>"/account/web?sh=5&ru=%2f"))
#    mypage = page.form_with(:action=>"/account/web") do |f|
#      f.checkbox_with(:id=>"vi").check
#    end.click_button
#   end

  a.get('http://www.bing.com/search?q=crusher') do |page|

	  # page.links.each do |link|
	  #   puts link.text
	  # end
  # doc = Nokogiri::HTML(page)

		  page.search('li.sa_wr').each do |link|
		    puts link.content
		  end


  end