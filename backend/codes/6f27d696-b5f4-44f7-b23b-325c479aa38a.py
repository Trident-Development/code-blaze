def twoSum(nums, target: int):
    for i in range(len(nums)):
        for j in range(i+1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return

print(twoSum([2,6,3,5,8, 10, 4, 5, 6, 7, 5,3, 2 ,4 ,5,6,6 ,4 5, 6, 5,5], 5))