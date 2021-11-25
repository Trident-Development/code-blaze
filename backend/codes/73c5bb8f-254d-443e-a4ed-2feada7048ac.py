def twoSum(nums, target: int):
    prevMap = {}
    # i id index and value is n
    for i, n in enumerate(nums):
        # we need to first check to see if the difference is already in the hashmap or not
        diff = target - n
        #  if it is, we can return the indices first of the difference index and the current element index
        if diff in prevMap:
            return [prevMap[diff], i]
        prevMap[n] = i
  
    return

print(twoSum([2,6,3,5,8, 10, 4, 5, 6, 7, 5,3,2,3,4,3,2,5,4,3,4,3,4,3,4,3,4,3,4,3,3,3,3,3,4,4,4,5,6,6,7,7,7,5,5,4,4,4,5,5,5,5,5,6,7,5,6,7,6,5,6,7,8, 2 ,4 ,5,6,6 ,4, 5, 6, 5,5], 5))