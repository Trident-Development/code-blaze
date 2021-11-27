const stubs = {};

stubs.cpp = `#include <iostream>

int main()
{
    std::cout << "Hello world from C++";
    return 0;
}`;



stubs.py = `def main(nums):
   for i in nums:
       print(i)
   return


main([1, 2, 3, 4, 5])`;

export default stubs;