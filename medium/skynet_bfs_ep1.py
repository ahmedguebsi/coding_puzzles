import sys
import math
from collections import defaultdict

class Graph():
    def __init__(self, vertices):
        self.graph = defaultdict(list)
        self.V = vertices

    def addEdge(self, u, v):
        self.graph[u].append(v)

    def isCyclicUtil(self, v, visited, recStack):

        # Mark current node as visited and
        # adds to recursion stack
        visited[v] = True
        recStack[v] = True

        # Recur for all neighbours
        # if any neighbour is visited and in
        # recStack then graph is cyclic
        for neighbour in self.graph[v]:
            if visited[neighbour] == False:
                if self.isCyclicUtil(neighbour, visited, recStack) == True:
                    return True
            elif recStack[neighbour] == True:
                return True

        # The node needs to be poped from
        # recursion stack before function ends
        recStack[v] = False
        return False

    # Returns true if graph is cyclic else false
    def isCyclic(self):
        visited = [False] * self.V
        recStack = [False] * self.V
        for node in range(self.V):
            if visited[node] == False:
                if self.isCyclicUtil(node, visited, recStack) == True:
                    return True
        return False


#g = Graph(4)
#g.addEdge(0, 1)
#g.addEdge(0, 2)
#g.addEdge(1, 2)
#g.addEdge(2, 0)
#g.addEdge(2, 3)
#g.addEdge(3, 3)
#if g.isCyclic() == 1:
    #print "Graph has a cycle"
#else:
    #print "Graph has no cycle"

class Node:
    def __init__(self,id):
        self.id =id
        self.parent = None
        self.connected_to =list()
        self.state = 0
        self.distance =0
        self.gateway = False

class File:
    """
      Class File is a class used for the BFS algo.
    """
    def __init__(self):
        self.tab=[]

    def enfile(self,value):
        self.tab.append(value)

    def isEmpty(self):
        return len(self.tab)== 0


    def defile(self):
        if not self.isEmpty():
            self.tab.pop(0)

def breadh_discovery(file):
    while not file.isEmpty():
        first = file.defile()
        for neighbor in first.connect_to:
            if neighbor.state == 0:
                neighbor.parent = first
                neighbor.state = 1
                neighbor.distance = first.distance = 1
                file.enfile(neighbor)
            first.state = 2


# n: the total number of nodes in the level, including the gateways
# l: the number of links
# e: the number of exit gateways
n, l, e = [int(i) for i in input().split()]
gateway_list = list()
nodes_list = [Node(x)for x in set(range(n))]
for i in range(l):
    # n1: N1 and N2 defines a link between these nodes
    n1, n2 = [int(j) for j in input().split()]
    node1 = next(filter(lambda x: x.id == n1, nodes_list))
    node2 = next(filter(lambda x: x.id == n2, nodes_list))
    node1.connected_to.append(node2)
    node2.connected_to.append(node1)

for i in range(e):
    ei = int(input())  # the index of a gateway node
    gateway_list.append(ei)

for node in nodes_list:
    if node.id in gateway_list:
        node.gateway = True

def breadth_gateway_search(sky):
    compare =Node("compare node")
    compare.distance = 100
    for gate in gateway_list:
        gateway = next(filter(lambda x : x.id == gate , nodes_list))
        compare = gateway if gateway.distance < compare.distance else compare
        while compare.parent.id != sky.id:
            compare = compare.parent
        return f"{compare.id} {sky.id}"

def init_nodes(nodes_list):
    for node in nodes_list:
        node.state = 0
        node.distance = 0
        node.parent = None

# game loop
while True:
    si = int(input())  # The index of the node on which the Bobnet agent is positioned this turn

    # Write an action using print
    # To debug: print("Debug messages...", file=sys.stderr, flush=True)
    sky = next(filter(lambda x: x.id == si, nodes_list))
    init_nodes(nodes_list)
    file = File()
    file.enfile(sky)
    breadh_discovery(file)
    print(breadth_gateway_search(sky))


    # Example: 0 1 are the indices of the nodes you wish to sever the link between
    #print("0 1")