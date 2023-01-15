import sys
import math

length_all_paths = dict()
max_length = 2

def go_to_next_person(influencer, influence):
    global length_all_paths
    global max_length
    if not influencer in length_all_paths.keys():
        length_all_paths[influencer] = 1
    else:
        return

    if influencer not in influence.keys():
        return

    for next_person in influence[influencer]:
        go_to_next_person(next_person, influence)

        if length_all_paths[influencer] <1 + length_all_paths[next_person]:
            length_all_paths[influencer] =1 + length_all_paths[next_person]
        if length_all_paths[influencer] > max_length:
            max_length = length_all_paths[influencer]

    return