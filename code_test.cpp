#include <stdio.h>

int main()
{
	//char c='0';
	//printf("%d%d",sizeof(c),sizeof('0'));
	//return 0;

	///
	char s[10]="mysohu";
	s[0]=0;//修改字符串常量 报错
	printf("%s",s);
}