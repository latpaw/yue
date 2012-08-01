require 'rubygems'
require 'mechanize'
require "nokogiri"

a = Mechanize.new { |agent|
  agent.user_agent_alias = 'Mac Safari'
}

a.get('http://www.google.co.in/search?hl=en&newwindow=1&noj=1&q=crusher&oq=crusher') do |page|

	  # page.links.each do |link|
	  #   puts link.text
	  # end
  # doc = Nokogiri::HTML(page)

  page.search('li.g').each do |link|
    puts link.content
  end

  end