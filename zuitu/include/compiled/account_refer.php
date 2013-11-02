<?php include template("header");?>

<div id="bdw" class="bdw">
<div id="bd" class="cf">
<div id="referrals">
	<div class="dashboard" id="dashboard">
		<ul><?php echo current_account('/account/refer.php'); ?></ul>
	</div>
    <div id="content" class="invites refers">
        <div class="box clear">
            <div class="box-top"></div>
            <div class="box-content">
                <div class="head">
					<h2>我的邀请</h2>
					<ul class="filter">
						<li class="label">分类: </li>
						<?php echo current_invite('refer'); ?>
					</ul>
				</div>
                <div class="sect">
					<div class="share-list">
						<div class="blk im">
							<div class="logo"><img src="/static/css/i/logo_qq.gif" /></div>
							<div class="info">
								<h4>这是您的专用邀请链接，请通过 MSN 或 QQ 发送给好友：</h4>
								<input id="share-copy-text" type="text" value="<?php echo $INI['system']['wwwprefix']; ?>/r.php?r=<?php echo $mail; ?>" size="35" class="f-input" onfocus="this.select()" tip="复制成功，可以通过 MSN 或 QQ 发送给好友了" />
								<input id="share-copy-button" type="button" value="复制" class="formbutton" />
							</div>
						</div>
					</div>

					<table cellspacing="0" cellpadding="0" border="0" class="coupons-table">
					<tr><th width="200">用户</th><th width="200">邀请时间</th><th width="200">状态</th></tr>
					<?php if(is_array($invites)){foreach($invites AS $index=>$one) { ?>
						<tr <?php echo $index%2?'':'class="alt"'; ?>><td><?php echo $users[$one['other_user_id']]['username']; ?></td><td><?php echo date('Y年m月d日 H:i', $one['create_time']); ?></td><td><?php echo invite_state($one); ?></td></tr>
					<?php }}?>
						<tr><td colspan="3"><?php echo $pagestring; ?></td></tr>
					</table>
				</div>
            </div>
            <div class="box-bottom"></div>
        </div>
    </div>
    <div id="sidebar">
		<?php include template("block_side_invitenotice");?>
    </div>
</div>
</div> <!-- bd end -->

</div> <!-- bdw end -->

<?php include template("footer");?>
