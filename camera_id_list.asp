<%
dim fname
fname=Request.Form("name")
camera_id=split(fname,",")
length=ubound(camera_id)
Response.Write("Dear " & fname & " ")
Response.Write(length & " ")
For i=0 to length-1 
Response.Write(camera_id(i) & " ")
Next
%>