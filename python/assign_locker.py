#-*-coding: utf-8-*-

import copy
import random
import math
import sys
import json

# 배정 함수
def assign(table, user):
    # 사물함 높이에 따른 개수 분할
    floor_0, floor_1, floor_2 = [0, 1, 3, 5], [0, 1, 3, 4], [0, 1, 3, 4]
    locker_height = [floor_0, floor_1, floor_2]

    student_id = user['student_id']
    first_floor, first_height = user['first_floor'], user['first_height']
    second_floor, second_height = user['second_floor'], user['second_height']
    shuffle_table = copy.deepcopy(table)

    # 첫번째 순위
    for floor in range(len(shuffle_table)):
        if floor == first_floor:
            div = math.floor((len(table[floor])) / locker_height[floor][3])
            bottom = div * locker_height[floor][first_height] + 1
            top = div * locker_height[floor][first_height + 1]

            print('범위 :', bottom, top)
            for count in range(top - bottom + 1):
                random_location = math.floor(random.sample(range(1 + top - bottom), 1 + top - bottom)[count]) + bottom
                if shuffle_table[floor][random_location][0] == '0':

                    table[floor][random_location][0] = student_id

                    print("1순위 지정 완료")
                    print(table[floor][random_location])
                    print("----------------------")
                    return

    # 두번째 순위
    for floor in range(len(table)):
        if floor == second_floor:
            div = math.floor((len(table[floor])) / locker_height[floor][3])
            bottom = div * locker_height[floor][first_height] + 1
            top = div * locker_height[floor][first_height + 1]

            for count in range(top - bottom + 1):
                random_location = math.floor(random.sample(range(1 + top - bottom), 1 + top - bottom)[count]) + bottom
                if shuffle_table[floor][random_location][0] == '0':

                    table[floor][random_location][0] = student_id

                    print("2순위 지정 완료")
                    print(table[floor][random_location])
                    print("----------------------")
                    return

    # 배정이 안될시
    for floor in range(len(shuffle_table)):
        for height in range(len(shuffle_table[floor])):
            if shuffle_table[floor][height][0] == '0':

                table[floor][height][0] = student_id

                print("순차 지정 완료")
                print(table[floor][height])
                print("----------------------")
                return


if __name__ == "__main__":
    """
    사물함 정보 불러오기
    index 0 = 배정된 학번
    index 1 = 사물함 번호
    
    테스트 사물함 데이터 
    index 0 = 배정된 학번
    index 1 = 사물함 번호
    index 2 = 사물함 배정 여부(필요 없음)
    """
    """
    유저 입력  
    지하 1층 -> 0, 1층 -> 1, 2층 -> 2
    하 -> 0, 중 -> 1, 상 -> 2
    """

    # input_user = [
    #     {'student_id': '20220001', 'first_floor': 1, 'first_height': 1, 'second_floor': 1, 'second_height': 0,
    #     'priority': 1},
    #     {'student_id': '20220002', 'first_floor': 1, 'first_height': 1, 'second_floor': 0, 'second_height': 0,
    #     'priority': 1},
    #     {'student_id': '20220003', 'first_floor': 1, 'first_height': 1, 'second_floor': 1, 'second_height': 0,
    #     'priority': 0},
    # ]

    input_table = [
        [['0', 'B101', 0], ['0', 'B102', 0], ['0', 'B103', 0], ['0', 'B104', 0], ['0', 'B105', 0]],
        [['0', 'L101', 0], ['0', 'L102', 0], ['0', 'L103', 0], ['0', 'L104', 0], ['0', 'L105', 0], ['0', 'L106', 0], ['0', 'L107', 0],
        ['0', 'L108', 0]],
        [['0', 'L301',0], ['0', 'L302',0], ['0', 'L303',0], ['0', 'L304',0]]
    ]

    with open("./API/applyInfo.json", "r") as f:
        apply_user_input = json.load(f)



    apply_user_input = sorted(apply_user_input, key=lambda x: x.get('priority'), reverse=True)
    for person in apply_user_input:
        assign(input_table, person)


    with open("./API/assignInfo.json", "w") as f:
        json.dump(input_table, f)
    
    
    # output = pd.DataFrame(test_table).transpose()
    # print(output)
    # output.to_excel('output.xlsx', header=False, index=False)
