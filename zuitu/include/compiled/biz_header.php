<?php include template("biz_html_header");?>
<script type="text/javascript" src="/static/js/xheditor/xheditor.js"></script>
<div id="hdw">
	<div id="hd">
		<div id="logo"><a href="/index.php" class="link" target="_blank"><img src="/static/css/i/logo.gif" /></a></div>
		<div class="guides">
			<div class="city">
				<h2>商户后台</h2>
			</div>
		</div>
		<ul class="nav cf"><?php echo current_biz(); ?><?php if(is_partner()){?><li><a id="verify-coupon-id" href="javascript:;">消费登记</a></li><?php }?></ul>
		<?php if(is_partner()){?>
		<div class="logins">
			<ul class="links">
				<li class="username">欢迎您，<?php echo $login_partner['title']; ?>！</li>
				<li class="logout"><a href="/biz/logout.php">退出</a></li>
			</ul>
			<div class="line islogin"></div>
		</div>
		<?php }?>
	</div>
</div>

<?php if($session_notice=Session::Get('notice',true)){?>
<div class="sysmsgw" id="sysmsg-success"><div class="sysmsg"><p><?php echo $session_notice; ?></p><span class="close">关闭</span></div></div> 
<?php }?>
<?php if($session_notice=Session::Get('error',true)){?>
<div class="sysmsgw" id="sysmsg-error"><div class="sysmsg"><p><?php echo $session_notice; ?></p><span class="close">关闭</span></div></div> 
<?php }?>
