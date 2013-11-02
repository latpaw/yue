import gtk
import wnck
import glib
import commands

class WindowTitle(object):
    def __init__(self):
        pids = commands.getstatusoutput("pidof linux1g1g")
        self.pid = pids[1]
        self.title = None
        glib.timeout_add(1000, self.get_title)

    def get_title(self):
        try:
            windows = wnck.screen_get_default().get_windows()
            for window in windows:
                xid = window.get_xid()
                re = commands.getstatusoutput("xprop -id " + str(xid) + " | grep NET_WM_PID ")
                result = re[1]
                if result.find(self.pid) > 0:
                    commands.getstatusoutput("gnome-osd-client " + window.get_name() )

                # if self.title != title:
                    # self.title  = title
                    # print title
        except AttributeError:
            pass
        return True

WindowTitle()
gtk.main()

