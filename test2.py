import gtk
import wnck
import glib
import commands

class WindowTitle(object):
    def __init__(self):
        pids = commands.getstatusoutput("pidof linux1g1g")
        pid = pids[1]
        print pid


    def init_title(self):
        print "abc"
        windows = wnck.screen_get_default().get_windows()
        print windows
        for window in windows:
            xid = window.get_xid()
            re = commands.getstatusoutput("xprop -id " + str(xid) + " | grep NET_WM_PID ")
            result = re[1]
            print result
            if result.find(pid) > 0:
                self.title = window.get_name()
                self.xid = xid
                # commands.getstatusoutput("gnome-osd-client " + window.get_name() )

    def get_title(self):
        try:
            title = wnck.window_get(self.xid).get_name()
            if self.title <> title:
                commands.getstatusoutput("gnome-osd-client " + window.get_name() )

                # if self.title != title:
                    # self.title  = title
                    # print title
        except AttributeError:
            pass
        return True

w = WindowTitle()
w.init_title
glib.timeout_add(1000, w.get_title)
gtk.main()

