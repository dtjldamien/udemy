import matplotlib.pyplot as plt
import pandas as pd

# customer support resolving issues by month
raw_data = {'name': ['Nick', 'Panda', 'A', 'B', 'C'],
            'jan_ir': [123, 122, 101, 106, 305],
            'feb_ir': [452, 543, 159, 324, 654],
            'mar_ir': [454, 456, 789, 547, 369]
            }

df = pd.DataFrame(raw_data, columns=['name', 'jan_ir', 'feb_ir', 'mar_ir'])

df['total_ir'] = df['jan_ir'] + df['feb_ir'] + df['mar_ir']

color = [(1, .4, .4), (1, .6, 1), (.5, .3, 1), (.3, 1, .5), (.7, .7, .2)]

plt.pie(df['total_ir'], labels=df['name'], colors=color, autopct='%1.1f%%')

plt.show()

print(df)
