<form action="" name="form" method="post" id="form">
		<p id="result" style="color:#003781;margin:0 20px;background:#f60;border-radius:3px;line-height:30px;text-align:center;margin-bottom:10px"> </p>
		<b style="color:#003781;padding-left:20px;">Get Price and Support</b>
		<p style="padding-left:20px;color:#333">You can get the price list and a SBM representative will contact you within one business day. </p>
		<div class="input" id="name_out">
			<span><?php locale("name");?>:</span> <input type="text" name="name" id="name" >
		</div>
		<div class="input" id="email_out">
			<span><?php locale("email");?>:</span> <input type="text" name="email" id="email" > <span style="color:#f00">*</span>
			<p style="color:#003781;font-size:10px;margin-left:135px;margin-top:2px;padding-left:5px" id="email_info">( We will never sell or share your information with third parties. )</p>
		</div>
		<input type="hidden" name="visits" id="visits" value="<?php echo $_GET['visits'];?>">

		<div class="input" id="application">
			<span><?php locale("application");?>:</span>
			<p> <i class="box orange" value="construction"><span></span></i>For Construction <b style="font-size:10px;font-weight:normal">(like concrete, highway, railway,brick,building,etc)</b> <br><br>
				<i class="box gray" value="mining"><span></span></i>For Mining <b style="font-size:10px;font-weight:normal">(like gold,iron,copper,beneficiation, or nonmetal beneficiation etc)</b>
			</p> 
		</div>
		<div class="input" id="equipment">
			<span><?php locale("equipment");?>:</span>
			<p><i class="box gray" value="crushers"><span></span></i> Crushers &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="box gray" value="mills"><span></span></i> Mills &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="box gray" value="feeder"><span></span></i> Feeder &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="box gray" value="conveyor"><span></span></i> Conveyor &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="box gray" value="screen"><span></span></i> Screen &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
		</div>
        <div class="input" id="message">
        	<span><?php locale("question");?>:</span>
        	<textarea id="textarea"></textarea>
        </div>

		<input type="button" id="submit" value="<?php locale('submit');?>">
		<div class="clear"></div>
	</form>