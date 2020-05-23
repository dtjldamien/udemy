import matplotlib.pyplot as plt
import numpy 

col_count = 3
bar_width = 0.1

korea_scores = (554, 536, 538)
canada_scores = (518, 523, 525)
china_scores = (613, 570, 580)
france_scores = (495, 505, 499)

index = numpy.arange(col_count)

# below will occupy the same bars, except vertically
# k1 = plt.bar(index, korea_scores, .5)
# c1 = plt.bar(index, canada_scores, 0.5)

korea = plt.bar(index, korea_scores, bar_width, alpha=.4, label="Korea")
canada = plt.bar(index + 2 * bar_width, canada_scores, bar_width, alpha=.4, label="Canada")
china = plt.bar(index + 4 * bar_width, china_scores, bar_width, alpha=.4, label="China")
france = plt.bar(index + 6 * bar_width, france_scores, bar_width, alpha=.4, label="France")

def CreateLabels(data):
    for item in data:
        height = item.get_height()
        # show in the middle of the bar and above the top of the bar
        plt.text(item.get_x() + item.get_width() / 2., height * 1.05,
                 '%d' % int(height), ha='center', va='bottom')
           
CreateLabels(korea)
CreateLabels(canada)     
CreateLabels(china)
CreateLabels(france)

plt.grid(True)
# can customise the look and feel of the legend 
# plt.legend(edgecolor=None, shadow=False, facecolor=(1,.4,.4))
plt.legend()
plt.xticks(index + 0.3 / 2, ("Math", "Reading", "Science"))
plt.ylabel("Mean score in PISA 2012")
plt.xlabel("Subjects")
    
integer = 365

# pass in variables in the string
# print("there are %d days in a year" % integer)

plt.show()