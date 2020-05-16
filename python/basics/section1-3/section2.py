# drop down two lines for after imports
# snake case for python defs, camel case for class names
def my_function():
    print("This is my function!")
    print("A second string")


def my_function2(str1, str2):
    print(str1)
    print(str2)

# Default arguments


def print_something(name="Someone", age="Unknown"):
    print("Concat: My name is " + name + " and my age is " + str(age))
    print("Comma: My name is", name, "and my age is", age)

# Cannot concat None (equivalent to null in other languages)


def print_something2(name="Someone", age="Unknown"):
    print("Comma: My name is", name, "and my age is", age)


my_function()
my_function2("My name is: ", "Damien Tan")
print_something("Damien", 22)
print_something()
print_something2(None, 22)

# Keyword arguments
print_something(age=27)
print_something(age=27, name="Nick")

# * means it is an array


def print_people(*people):
    for person in people:
        print("This person is", person)


print_people("Asher", "Benjamin", "Caleb", "Damien", "Eli")


def do_math(num1, num2):
    return num1 + num2


math1 = do_math(5, 7)
math2 = do_math(11, 34)

print("First sum is", math1, "and the second sum is", math2)

check = "he"

if check == False:
    print("Check is false")
elif check == "Hamburger":
    print("Hamburgers!")
elif check == "Yo":
    print("Hello!")
else:
    print("Check is actually true")

# for loop
numbers = [1, 2, 3, 4, 5]
for item in numbers:
    print("The number is", item)

# while loop
run = True
current = 1
while run:
    if current == 10:
        run = False
    else:
        print(current)
        current += 1