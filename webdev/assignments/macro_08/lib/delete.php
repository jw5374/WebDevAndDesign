<?php
    include('config.php');

    $db = new SQLite3($dbpathlib);

    $commentid = $_GET['commentid'];
    $postid = $_GET['postid'];
    $referalid = $_GET['referer'];
    $query = $_GET['query'];
    if($referalid) {
        $deleteComment = "DELETE FROM comments WHERE id=$commentid";
        $db->query($deleteComment);
        header($postredirect . "?postid=$referalid");
        exit();
    }
    if($query) {
        if($postid) {
            $deleteComments = "DELETE FROM comments WHERE post_id=$postid";
            $deletePost = "DELETE FROM posts WHERE id=$postid";
            $db->query($deleteComments);
            $db->query($deletePost);
        } elseif($commentid) {
            $deleteComment = "DELETE FROM comments WHERE id=$commentid";
            $db->query($deleteComment);
        }
        header($searchredirect . "?q=$query");
        exit();
    }
    if($postid) {
        $deleteComments = "DELETE FROM comments WHERE post_id=$postid";
        $deletePost = "DELETE FROM posts WHERE id=$postid";
        $db->query($deleteComments);
        $db->query($deletePost);
        header($homeredirect);
        exit();
    }
?>