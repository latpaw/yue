<?php include template("header");?>

<div id="bdw" class="bdw">
<div id="bd" class="cf">
<div id="coupons">
	<div class="dashboard" id="dashboard">
		<ul><?php echo current_account('/order/index.php'); ?></ul>
	</div>
    <div id="content" class="coupons-box clear">
		<div class="box clear">
            <div class="box-top"></div>
            <div class="box-content">
                <div class="head">
                    <h2>我的订单</h2>
                    <ul class="filter">
						<li class="label">分类: </li>
						<?php echo current_order_index($selector); ?>
					</ul>
				</div>
                <div class="sect">
				    <?php if($selector=='index' || $selector=='pay' || $selector=='unpay' || $selector=='' ){?>
					<table id="orders-list" cellspacing="0" cellpadding="0" border="0" class="coupons-table">
						<tr><th width="380">项目名称</th><th width="60">数量</th><th width="60">总价</th><th width="60">状态</th><th width="80">操作</th></tr>
					<?php if(is_array($orders)){foreach($orders AS $index=>$one) { ?>
						<tr <?php echo $index%2?'':'class="alt"'; ?>>
							<td style="text-align:left;"><a class="deal-title" href="/team.php?id=<?php echo $one['team_id']; ?>" target="_blank"><?php echo $teams[$one['team_id']]['title']; ?></a></td>
							<td><?php echo $one['quantity']; ?></td>
							<td><span class="money"><?php echo $currency; ?></span><?php echo moneyit($one['origin']); ?></td>
							<td><?php if($one['state']=='pay'){?>已付款<?php } else if($teams[$one['team_id']]['close_time']>0) { ?>已过期<?php } else { ?>未付款<?php }?></td>
							<td class="op"><?php if(($one['state']=='unpay'&&$teams[$one['team_id']]['close_time']==0)){?><a href="/order/check.php?id=<?php echo $one['id']; ?>">付款</a><?php } else if($one['state']=='pay') { ?><a href="/order/view.php?id=<?php echo $one['id']; ?>">详情</a>&nbsp;|&nbsp;<a href="/order/ajax.php?action=ordercomment&id=<?php echo $one['id']; ?>" class="ajaxlink"><?php echo $one['comment_time'] ? $option_commentgrade[$one['comment_grade']] : '点评'; ?></a><?php } else if($teams[$one['team_id']]['close_time']>0 ) { ?><a href="/ajax/order.php?action=orderdel&id=<?php echo $one['id']; ?>" class="ajaxlink" ask="确定删除本订单？">删除</a><?php }?></td>
						</tr>
					<?php }}?>
						<tr><td colspan="5"><?php echo $pagestring; ?></td></tr>
                    </table>		
					<?php } else { ?>
                    <table id="orders-list" cellspacing="0" cellpadding="0" border="0" class="coupons-table">
						<tr><th width="380">项目名称</th><th width="60">数量</th><th width="60">总价</th><th width="60">状态</th><th width="80">操作</th></tr>
					<?php if(is_array($orders)){foreach($orders AS $index=>$one) { ?>
						<tr <?php echo $index%2?'':'class="alt"'; ?>>
							<td style="text-align:left;"><a class="deal-title" href="/team.php?id=<?php echo $one['team_id']; ?>" target="_blank"><?php echo $teams[$one['team_id']]['title']; ?></a></td>
							<td><?php echo $one['quantity']; ?></td>
							<td><span class="money"><?php echo $currency; ?></span><?php echo moneyit($one['origin']); ?></td>
							<td>已付款</td>
							<td class="op"><?php if(($one['rstate']=='askrefund')){?>退款审核中<?php } else if($one['rstate']=='normal') { ?><a href="/ajax/refund.php?action=askrefund&id=<?php echo $one['id']; ?>" class="ajaxlink">申请退款</a>
							<?php } else if($one['rstate']=='berefund') { ?>退款成功<?php } else if($one['rstate']=='norefund') { ?>退款失败<?php }?></td>
						</tr>
					<?php }}?>
						<tr><td colspan="5"><?php echo $pagestring; ?></td></tr>
                    </table>
					<?php }?>
				</div>
            </div>
            <div class="box-bottom"></div>
        </div>
    </div>
    <div id="sidebar">
		<?php include template("block_side_aboutorder");?>
    </div>
</div>

</div> <!-- bd end -->
</div> <!-- bdw end -->

<?php include template("footer");?>
