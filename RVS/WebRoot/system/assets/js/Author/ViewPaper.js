/**
 * Created by Administrator on 13-10-30.
 */
function back(){
	location.href=".";
}
function addReview(data)
{
	var n=1;
    var btn='<div class="form-group">  \
                                      \
                <div class="col-sm-offset-4 col-sm-7 ">   \
                    <img id="loadingimg" src="../assets/img/loading.gif"  style="display: none"  />    \
                    <button id="btn-submitReview" type="submit" class="btn btn-lg btn-primary pull-right" onclick="back()">Back</button>     \
                </div>                     \
            </div>     '
    var com='<div class="form-group">   \
                <label for="comment-chair" class="col-sm-2 control-label">Comment to Chair (optional):</label>   \
                 \
                <div class="col-sm-9">   \
                    <textarea id="comment-chair" placeholder="Comments which can be seen only by PC-Chairs" name="commentChair" class="form-control" rows="5"></textarea>      \
                </div>    \
            </div>   '
 
  
    var json=$.z4x(data);
    console.log(json);
    if(json.root.Error){
    	$("#review-content").before("<hr/>");
    	$("#review-content").before("<h3 style='text-align:center;color:#b94a48'>"+json.root.Error[0].$$+"</h3>");
    	$("#review-content").before("<hr/>");
    	 $("#review-content").before(btn);
    	return;
    }
    var Review=json.root.Review;
    
    for(var i=0;i<json.root.Review.length;i++){
    	var revCont='<hr/>\
        	<div class="container text-center" ><span class="text-danger"><span class="glyphicon glyphicon-th-large"></span> <strong>Review '+n+'</strong></span></div>\
        	<div id="text_content" class="row container" style="margin-top: 30px">  \
            <form class="form-horizontal" role="form" id="reviewform'+n +   
            '" onsubmit="return false;"> \
            <div class="form-group">  \
                <label for="confidence" class="col-sm-2 control-label">Confidence:</label>   \
                <div class="col-sm-3">     \
                    <select id="confidence'+n+
            '" name="confidence" class="form-control" disabled>  \
                        <option value="3">3:strong confidence</option>    \
                        <option value="2">2:medium</option>   \
                        <option value="1">1:not familiar</option>    \
                    </select>         \
                </div>            \
                <label for="novelty" class="col-sm-3 control-label">Novelty:</label>   \
                <div class="col-sm-3">     \
                    <select id="novelty'+n+
            '" name="novelty" class="form-control" disabled>  \
                        <option value="4">4:excellent</option>  \
                        <option value="3">3:good</option>    \
                        <option value="2">2:adequate</option>  \
                        <option value="1">1:inadequate</option>  \
                    </select>           \
                </div>           \
            </div>             \
            <div class="form-group">    \
            <label for="depth" class="col-sm-2 control-label">Depth:</label> \
               \
            <div class="col-sm-3">     \
            <select id="depth'+n+
            '" name="depth" class="form-control" disabled>   \
                <option value="4">4:excellent</option>    \
                <option value="3">3:good</option>     \
                <option value="2">2:adequate</option>  \
                <option value="1">1:inadequate</option>  \
            </select>      \
            </div>         \
            <label for="presentation" class="col-sm-3 control-label">Presentation:</label>   \
                            \
        <div class="col-sm-3">   \
            <select id="presentation'+n+
            '" name="presentation" class="form-control" disabled>   \
                <option value="4">4:excellent</option>   \
                <option value="3">3:good</option>       \
                <option value="2">2:adequate</option>   \
                <option value="1">1:inadequate</option>     \
            </select>                \
            </div>                 \
            </div>                 \
                <div class="form-group">   \
                    <label for="comment" class="col-sm-2 control-label">Comment to Author:</label>  \
                         \
                    <div class="col-sm-9">    \
                        <textarea id="comment'+n+
            '" name="comment" class="form-control" rows="5" placeholder="Comments which can be seen both by PC-Chairs and Authors" disabled></textarea>      \
                    </div>      \
                </div>      \
                <hr/>      \
              \
                <div class="form-group">     \
                    <label for="overall" class="col-sm-2 control-label">Overall:</label>   \
                               \
                    <div class="col-sm-9">        \
                        <select id="overall'+n+
                        '" name="overall" class="form-control" disabled>   \
                            <option value="5">5:strong accept</option>              \
                            <option value="4">4:accept</option>                  \
                            <option value="3">3:weak accept</option>          \
                            <option value="2">2:weak reject</option>      \
                            <option value="1">1:reject</option>         \
                        </select>            \
                    </div>      \
                </div>          \
                              \
                \
            </form>               \
        </div>';
    	$("#review-content").before(revCont);
    	$("#confidence"+n).val(Review[i].record[0].confidence[0].$$);
    	//console.log("confidence"+i+Review[i].record[0].confidence[0].$$);
    	//console.log("confidence="+Review[i].record[0].novelty[0].$$);
    	$("#novelty"+n).val(Review[i].record[0].novelty[0].$$);
    	$("#depth"+n).val(Review[i].record[0].depth[0].$$);
    	$("#presentation"+n).val(Review[i].record[0].presentation[0].$$);
    	$("#comment"+n).val(Review[i].record[0].comment[0].$$);
    	$("#overall"+n).val(Review[i].record[0].overall[0].$$);
    	n=n+1;
    }
    $("#review-content").before(btn);
 
    
    
}

function addError(data){
	
}

function addVal(data){
	var confidence=$(data).find("confidence").val();
	var novelty=$(data).find("novelty").val();
	var depth=$(data).find("depty").val();
	var presentation=$(data).find("presentation").val();
	var comment=$(data).find("comment").val();
	console.log("confidence="+confidence);
	$("#confidence").val(confidence);
	$("#novelty").val(novelty);
	$("#depth").val(depth);
	$("presentation").val(presentation);
	$("comment").val(comment);
}