
import {Component} from "@angular/core";
@Component({
    selector:'footer',
  styles:[`
/*--footer--*/
.wrap{
	width:80%;
	margin:0 auto;
	-moz-transition:all .2s linear;
	-webkit-transition:all .2s linear; 
	-o-transition:all .2s linear; 
	-ms-transition:all .2s linear;
}

.footer{
	background: #333;
	color: #ccc;
	padding: 20px 0;
	font-size: 12px;
}

.copy{
	float:left;
	margin-top: 12px;
}
ul.follow_icon{
	float:right;
}
.copy p {
	color: #FFF;
	font-size: 1.1em;
}
.copy p a{
	color: #ffffff;
}
.copy p a:hover{
	color:#fff;
}

ul.follow_icon{
	float:right;
}
.follow_icon li {
	float: left;
	margin-right: 20px;
}
.follow_icon li a img {
	vertical-align: middle;
}
.clear{clear:both;}/* clear float */

`],
    template:`
<div class="footer">
	   <div class="wrap">
		 <div class="copy">
			<p>© 2016 All rights Reserved  <a href="http://petstore.com">PetStore</a></p>
		</div>
		<ul class="follow_icon">
		   <li><a href="#" style="opacity: 1;"><img src="../../assets/img/fb.png" alt=""></a></li>
		   <li><a href="#" style="opacity: 1;"><img src="../../assets/img/tw.png" alt=""></a></li>
		   <li><a href="#" style="opacity: 1;"><img src="../../assets/img/rss.png" alt=""></a></li>
		   <li><a href="#" style="opacity: 1;"><img src="../../assets/img/g+.png" alt=""></a></li>
		</ul>
		<div class="clear"></div> 
	</div>
</div>
`
})
export class FooterComponent{

}