import re


print("Calculator")
print("Type 'quit' to exit\n")

# Global variable
previous = 0
run = True


def perform_math():
    # to access and change the global variable
    global run
    global previous
    equation = ""
    if previous ==0:
        equation = input("Enter equation:")
    else:
        equation = input(str(previous))

    if equation == 'quit':
        run = False
        print("Goodbye!")
    else:
        # regex
        equation = re.sub('[a-zA-Z,.:()" "]', '', equation)
        if previous == 0:
            previous = eval(equation)
        else:
            previous=eval(str(previous) + equation)

while run:
    perform_math()
