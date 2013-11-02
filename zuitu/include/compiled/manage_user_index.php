<?php include template("manage_header");?>

<div id="bdw" class="bdw">
<div id="bd" class="cf">
<div id="coupons">
	<div class="dashboard" id="dashboard">
		<ul><?php echo mcurrent_user('index'); ?></ul>
	</div>
    <div id="content" class="coupons-box clear mainwide">
		<div class="box clear">
            <div class="box-top"></div>
            <div class="box-content">
                <div class="head">
                    <h2>用户列表</h2>
                    <ul class="filter">
						<li><form action="/manage/user/index.php" method="get">用户名：<input type="text" name="uname" class="h-input" style="width:90px" value="<?php echo htmlspecialchars($uname); ?>" >&nbsp;邮件：<input type="text" name="like" class="h-input" value="<?php echo htmlspecialchars($like); ?>" >&nbsp;<select name="ucity" style="width:110px;"><?php echo Utility::Option(option_category('city'), $ucity, '所有城市'); ?></select>&nbsp;购买次数大于<input type="text" name="numbers" class="h-input" value="<?php echo $numbers; ?>" style="width:20px">&nbsp;购买金额大于<input type="text" name="prices" class="h-input" value="<?php echo $prices; ?>" style="width:30px">&nbsp;余额大于<input type="text" name="havemoney" class="h-input" value="<?php echo $havemoney; ?>" style="width:20px">&nbsp;&nbsp;<input type="submit" value="筛选" class="formbutton"  style="padding:1px 6px;"/><form></li>
					</ul>
				</div>
                <div class="sect">
					<table id="orders-list" cellspacing="0" cellpadding="0" border="0" class="coupons-table">
					<tr><th width="50">ID</th><th width="200">Email/用户名</th><th width="100" nowrap>姓名/城市</th><th width="40">余额</th><th width="40">邮编</th><th width="120">注册IP/注册时间</th></th><th width="90">联系电话</th><th width="130">操作</th></tr>
					<?php if(is_array($users)){foreach($users AS $index=>$one) { ?>
					<tr <?php echo $index%2?'':'class="alt"'; ?> id="team-list-id-<?php echo $one['id']; ?>">
						<td><?php echo $one['id']; ?></td>
						<td><?php echo $one['email']; ?><br/><?php echo $one['username']; ?><?php if(Utility::IsMobile($one['mobile'])){?>&nbsp;&raquo;&nbsp;<a href="/ajax/misc.php?action=sms&v=<?php echo $one['mobile']; ?>" class="ajaxlink">短信</a><?php }?></td>
						<td><?php echo $one['realname']?$one['realname']:'----';; ?><br/><?php if($one['city_id']){?><?php echo $allcities[$one['city_id']]['name']; ?><?php } else { ?>其他<?php }?></td>
						<td><span class="currency"><?php echo $currency; ?></span><?php echo moneyit($one['money']); ?></td>
						<td><?php echo $one['zipcode']; ?></td>
						<td><?php echo $one['ip']; ?><br/><?php echo date('Y-m-d H:i', $one['create_time']); ?></td>
						<td><?php echo $one['mobile']; ?></td>
						<td class="op"><a href="/ajax/manage.php?action=userview&id=<?php echo $one['id']; ?>" class="ajaxlink">详情</a>｜<a href="/manage/user/edit.php?id=<?php echo $one['id']; ?>">编辑</a><br /><a href="/manage/user/ajax.php?action=delete&id=<?php echo $one['id']; ?>" class="ajaxlink" ask="确定删除该用户吗？">删除</a>｜<a href="/manage/user/ajax.php?action=consume&id=<?php echo $one['id']; ?>" class="ajaxlink">明细</a>｜<a href="/manage/user/ajax.php?action=flow&id=<?php echo $one['id']; ?>" class="ajaxlink">流水</a></td>
					</tr>
					<?php }}?>
					<tr><td colspan="8"><?php echo $pagestring; ?></tr>
                    </table>
				</div>
            </div>
            <div class="box-bottom"></div>
        </div>
    </div>
</div>
</div> <!-- bd end -->
</div> <!-- bdw end -->

<?php include template("manage_footer");?>
