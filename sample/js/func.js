
create function
######
$1: function($2) {
    ${3|var,let,const|} self = this;
    ${4|var,let,const|} data = this.data;
    ${5|var,const|} condition = this.data.condition;
    ${6:return true;}
},