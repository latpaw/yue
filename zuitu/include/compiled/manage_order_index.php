<?php include template("manage_header");?>

<div id="bdw" class="bdw">
<div id="bd" class="cf">
<div id="coupons">
	<div class="dashboard" id="dashboard">
		<ul><?php echo mcurrent_order('index'); ?></ul>
	</div>
    <div id="content" class="coupons-box clear mainwide">
		<div class="box clear">
            <div class="box-top"></div>
            <div class="box-content">
                <div class="head">
                    <h2>当期订单</h2>
				</div>
				<div class="sect" style="padding:0 10px;">
					<form method="get">
						<p style="margin:5px 0;">订单编号：<input type="text" name="id" value="<?php echo htmlspecialchars($id); ?>" class="h-input"/>&nbsp;用户：<input type="text" name="uemail" class="h-input" value="<?php echo htmlspecialchars($uemail); ?>" >&nbsp;项目编号：<input type="text" name="team_id" class="h-input number" value="<?php echo $team_id; ?>" ></p>
						<p style="margin:5px 0;">下单日期：<input type="text" class="h-input" onFocus="WdatePicker({isShowClear:false,readOnly:true})" name="cbday" value="<?php echo $cbday; ?>" /> - <input type="text" class="h-input" onFocus="WdatePicker({isShowClear:false,readOnly:true})" name="ceday" value="<?php echo $ceday; ?>" />&nbsp;付款日期：<input type="text" class="h-input" onFocus="WdatePicker({isShowClear:false,readOnly:true})" name="pbday" value="<?php echo $pbday; ?>" /> - <input type="text" class="h-input" onFocus="WdatePicker({isShowClear:false,readOnly:true})" name="peday" value="<?php echo $peday; ?>" /></p>
						<p style="margin:5px 0;"><input type="submit" value="筛选" class="formbutton"  style="padding:1px 6px;"/></p>
					<form>
				</div>
                <div class="sect">
					<table id="orders-list" cellspacing="0" cellpadding="0" border="0" class="coupons-table">
					<tr><th width="40">ID</th><th width="340">项目</th><th width="180">用户</th><th width="40" nowrap>数量</th><th width="50" nowrap>总款</th><th width="50" nowrap>余付</th><th width="50" nowrap>支付</th><th width="50" nowrap>递送</th><th width="50" nowrap>操作</th></tr>
					<?php if(is_array($orders)){foreach($orders AS $index=>$one) { ?>
					<tr <?php echo $index%2?'':'class="alt"'; ?> id="order-list-id-<?php echo $one['id']; ?>">
						<td><?php echo $one['id']; ?></td>
						<td><?php echo $one['team_id']; ?>&nbsp;(<a class="deal-title" href="/team.php?id=<?php echo $one['team_id']; ?>" target="_blank"><?php echo $teams[$one['team_id']]['title']; ?></a>)</td>
						<td><a href="/ajax/manage.php?action=userview&id=<?php echo $one['user_id']; ?>" class="ajaxlink"><?php echo $users[$one['user_id']]['email']; ?><br/><?php echo $users[$one['user_id']]['username']; ?></a><?php if(Utility::IsMobile($users[$one['user_id']]['mobile'])){?>&nbsp;&raquo;&nbsp;<a href="/ajax/misc.php?action=sms&v=<?php echo $users[$one['user_id']]['mobile']; ?>" class="ajaxlink">短信</a><?php }?></td>
						<td><?php echo $one['quantity']; ?></td>
						<td><span class="money"><?php echo $currency; ?></span><?php echo moneyit($one['origin']); ?></td>
						<td><span class="money"><?php echo $currency; ?></span><?php echo moneyit($one['credit']); ?></td>
						<td><span class="money"><?php echo $currency; ?></span><?php echo moneyit($one['money']); ?></td>
						<td><?php echo $option_delivery[$teams[$one['team_id']]['delivery']]; ?><?php echo ($one['express_no']&&$one['express_id'])?'Y':''; ?></td>
						<td class="op" nowrap><?php if($one['state']=='pay'){?><a href="/ajax/manage.php?action=orderview&id=<?php echo $one['id']; ?>" class="ajaxlink">详情</a><?php } else if($one['state']=='unpay') { ?><a href="/ajax/manage.php?action=ordercash&id=<?php echo $one['id']; ?>" class="ajaxlink" ask="确认本订单为现金付款？">现金</a><?php }?></td>
					</tr>
					<?php }}?>
					<tr><td colspan="9"><?php echo $pagestring; ?></tr>
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
