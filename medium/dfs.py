def dfs(n, s, vis = set()):
    if n[s] == 0: # reach destination
        return True
    for i in [-1, 1]:
        next = s + i * n[s]  # next position
        if (next not in vis) and (next >= 0) and (next < len(n)):
            vis.add(next)  # mark as visited
            if dfs(n, next, vis): # this way we can reach the destination?
                vis.remove(next)  # optional
                return True
            vis.remove(next)
    return False