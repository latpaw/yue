<?php include template("manage_header");?>

<div id="bdw" class="bdw">
<div id="bd" class="cf">
<div id="coupons">
	<div class="dashboard" id="dashboard">
		<ul><?php echo mcurrent_misc('expire'); ?></ul>
	</div>
    <div id="content" class="coupons-box clear mainwide">
		<div class="box clear">
            <div class="box-top"></div>
            <div class="box-content">
                <div class="head">
                     <h2>项目过期短信提醒</h2>
				</div>
                <div class="sect">
					<table id="orders-list" cellspacing="0" cellpadding="0" border="0" class="coupons-table">
					<tr>
						<th>项目名称</th>
						<th width="150">到期时间</th>
						<th width="150">未消费优惠券数量</th>
						<th width="170">短信发送</th>
					</tr>
					<?php if(is_array($teams)){foreach($teams AS $index=>$one) { ?>
					<tr <?php echo $index%2?'':'class="alt"'; ?> id="team-list-id-<?php echo $one['id']; ?>">
						<td><a href="/team.php?id=<?php echo $one['id']; ?>" target="_blank"><?php echo mb_strimwidth($one['title'],0, 36,'...'); ?></a></td>
						<td><?php echo date('Y年m月d日',$one['expire_time']); ?>到期</td>
						<td><?php echo notconsume($one['id']); ?></td>
						<td><?php if($one['send_time']){?>已发送于<?php echo date('Y年m月d日',$one['send_time']); ?><?php } else { ?><a href="/ajax/expire.php?action=send&id=<?php echo $one['id']; ?>" class="ajaxlink">发送</a><?php }?></td>
					</tr>
					<?php }}?>
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
