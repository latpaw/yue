<?php include template("manage_header");?>

<div id="bdw" class="bdw">
<div id="bd" class="cf">
<div id="help">
	<div class="dashboard" id="dashboard">
		<ul><?php echo mcurrent_misc('index'); ?></ul>
	</div>
    <style>.sect table td{padding:5px;}</style>
    <div id="content" class="coupons-box clear mainwide">
		<div class="box clear">
            <div class="box-top"></div>
            <div class="box-content">
                <div class="head">
                    <h2>最土软件(<?php echo SYS_VERSION; ?>_<?php echo SYS_SUBVERSION; ?>)</h2>
				</div>
				<div class="sect">
					<div class="wholetip clear"><h3>最新版本<?php echo $newversion; ?>_<?php echo $newsubversion; ?>&nbsp;[<?php if($isnew){?><span style="color:green">是</span><?php } else { ?><spanstyle="color:red">否</span><?php }?>]&nbsp;[<a href="/manage/misc/index.php?action=db">升级数据库结构</a>]</h3></div>
					<?php if(is_manager(1)){?>
					<div class="wholetip clear"><h3>周数据报表</h3></div>
                    <div style="margin:10px 20px;"><strong>[<?php echo $thisday; ?>]</strong></div>
                    <div style="margin:20px;">
                    <table style="width:100%;" cellpadding="5" cellspacing="0" border="1" bordercolor="#89B4D6">
                    <tr valign="middle">
                        <td></td>
                        <td>周日<br /><?php echo $week[0]; ?></td>
                        <td>周一<br /><?php echo $week[1]; ?></td>
                        <td>周二<br /><?php echo $week[2]; ?></td>
                        <td>周三<br /><?php echo $week[3]; ?></td>
                        <td>周四<br /><?php echo $week[4]; ?></td>
                        <td>周五<br /><?php echo $week[5]; ?></td>
                        <td>周六<br /><?php echo $week[6]; ?></td>
                        <td>合计</td>
                    </tr>
                    <tr>
                        <td>注册用户</td>
                        <?php if(is_array($week)){foreach($week AS $one) { ?><td><?php echo strval($weekuser[$one]); ?></td><?php }}?>
                        <td><?php echo sum(array_values($weekuser)); ?></td>
                    </tr>
                    <tr>
                        <td>在线项目</td>
                        <?php if(is_array($week)){foreach($week AS $one) { ?><td><?php echo strval($weekteamonline[$one]); ?></td><?php }}?>
                        <td>-----</td>
                    </tr>
                    <tr>
                        <td>新上项目</td>
                        <?php if(is_array($week)){foreach($week AS $one) { ?><td><?php echo strval($weekteamnew[$one]); ?></td><?php }}?>
                        <td><?php echo sum(array_values($weekteamnew)); ?></td>
                    </tr>
                    <tr>
                        <td>付款订单</td>
                        <?php if(is_array($week)){foreach($week AS $one) { ?><td><?php echo strval($weekorderpay[$one]); ?></td><?php }}?>
                        <td><?php echo sum(array_values($weekorderpay)); ?></td>
                    </tr>
                    <tr>
                        <td>实际销售</td>
                        <?php if(is_array($week)){foreach($week AS $one) { ?><td><?php echo strval($weekorderpayorigin[$one]); ?></td><?php }}?>
                        <td><?php echo sum(array_values($weekorderpayorigin)); ?></td>
                    </tr>
                    <tr>
                        <td>余额销售</td>
                        <?php if(is_array($week)){foreach($week AS $one) { ?><td><?php echo strval($weekorderpaycredit[$one]); ?></td><?php }}?>
                        <td><?php echo sum(array_values($weekorderpaycredit)); ?></td>
                    </tr>
                    <tr>
                        <td>付款销售</td>
                        <?php if(is_array($week)){foreach($week AS $one) { ?><td><?php echo strval($weekorderpaymoney[$one]); ?></td><?php }}?>
                        <td><?php echo sum(array_values($weekorderpaymoney)); ?></td>
                    </tr>
                    <tr>
                        <td>未付订单</td>
                        <?php if(is_array($week)){foreach($week AS $one) { ?><td><?php echo strval($weekorderunpay[$one]); ?></td><?php }}?>
                        <td><?php echo sum(array_values($weekorderunpay)); ?></td>
                    </tr>
                    <tr>
                        <td>在线充值</td>
                        <?php if(is_array($week)){foreach($week AS $one) { ?><td><?php echo strval($weekflowcharge[$one]); ?></td><?php }}?>
                        <td><?php echo sum(array_values($weekflowcharge)); ?></td>
                    </tr>
                    <tr>
                        <td>线下充值</td>
                        <?php if(is_array($week)){foreach($week AS $one) { ?><td><?php echo strval($weekflowstore[$one]); ?></td><?php }}?>
                        <td><?php echo sum(array_values($weekflowstore)); ?></td>
                    </tr>
                    </table>
                    </div>
                    <div style="margin:10px 20px;text-align:right;"><a href="index.php?page=<?php echo $page+1; ?>">&lt;&lt;上一周</a><?php if($page>0){?>&nbsp;&nbsp;<a href="index.php?page=<?php echo $page-1; ?>">下一周&gt;&gt;</a><?php } else { ?>&nbsp;&nbsp;下一周&gt;&gt;<?php }?></div>
					<?php }?>
					<div class="wholetip clear"><h3>全站统计表</h3></div>
					<div style="margin:0 20px;">
						<p>团购项目数：<?php echo $team_count; ?></p>
						<p>用户注册数：<?php echo $user_count; ?></p>
						<p>团购订单数：<?php echo $order_count; ?></p>
						<p>邮件订阅数：<?php echo $subscribe_count; ?></p>
					</div>
				</div>
			</div>
            <div class="box-bottom"></div>
        </div>
    </div>
</div>
</div> <!-- bd end -->
</div> <!-- bdw end -->

<?php include template("manage_footer");?>
