import timeit
import time 
import sys 

User_Chapter = 1  
User_Lesson = 1 
Lesson_Number = None    
Lesson_Chapter = None  
Progression = (User_Chapter/10) * (User_Lesson/10)  
ListName = f'TimeLesson {User_Chapter}.{User_Lesson}' 

def LessonTime(): 
    global lesson_completed; lesson_completed = False
    started = time.time()
    x = 1
    for x in range(x+1):
        x + 1
        if lesson_completed == False:
            time.sleep(3)
            lesson_completed= True 
        elif lesson_completed == True:
            finished = time.time()
    timed = finished - started 
    return timed


placeholder = "placeholder"
print(LessonTime())
timed = LessonTime()  
Info = User_Chapter, User_Lesson, timed, placeholder
TimerLog = open("TimerLog.txt", "a") 
TimerLog.writelines(f'{Info} \n')
TimerLog.close() 

def TimerRecap(Line): 
    TimerLog = open("TimerLog.txt", "r")
    printable = TimerLog.readlines()
    print(printable[Line])
    processingLine = printable[Line]
    TimerLog.close()
    cprocess = processingLine.split(",")

    return cprocess

test = TimerRecap(1)

score = [80, 1, 60, 2, 50, 3, 98, 4, 100, 5, 69, 6, 57, 7, 86, 8, 9, 99, 10, 78, 11, 68, 12, 67, 13, 55, 14, 77, 15, 76, 16, 97, 17, 86, 18, 78, 19, 85, 20, 100, 21, 43, 21, 67, 22, 76, 23, 78, 24, 67, 25, 88, 26, 87, 27]
yValue = score[::2]  
xValue = score[1::2] 

if len(score) >= 40: 
    ScoreLog = open("ScoreLog.txt", "a") 
    ScoreLog.writelines(f"Score and Time:{score} \n") #! writes the acutal numbers to a fixed place (here: .txt)
    ScoreLog.writelines(f"Score:{yValue} \n")
    ScoreLog.writelines(f"Time:{xValue} \n")
    ScoreLog.close()  
    score = [] #
    yValue = [] 
    xValue = []

def Get_Retentiveness(ChosenLesson, Retent_start):
    DistrbutionRetv = (yValue[int(User_Lesson/5)] + yValue[int((User_Lesson/5)/2)] + yValue[int((User_Lesson/5)/4)] + yValue[int((User_Lesson/5)/8)]) / 5  #! current exception/error here, dont know how to fix yet 
    first_Score = ((float(yValue[ChosenLesson]) + float(DistrbutionRetv)) * (int(TimerRecap(Retent_start)[2])/60)) * 0.1  #! i guess the same error also happens in the whole func
    second_Score = ((yValue[ChosenLesson - 2] + DistrbutionRetv) * (int(TimerRecap(Retent_start + 2.0)[2])/60)) * 0.1  
    thrid_Score =  ((yValue[ChosenLesson - 2] + DistrbutionRetv) * (int(TimerRecap(Retent_start + 2.0)[2])/60)) * 0.1
    fourth_Score =  ((yValue[ChosenLesson - 2] + DistrbutionRetv) * (int(TimerRecap(Retent_start + 2.0)[2])/60)) * 0.1
    fifth_Score =  ((yValue[ChosenLesson - 2] + DistrbutionRetv) * (int(TimerRecap(Retent_start + 2.0)[2])/60)) * 0.1
    sixth_Score = ((yValue[ChosenLesson - 2] + DistrbutionRetv) * (int(TimerRecap(Retent_start + 2.0)[2])/60)) * 0.1
    seventh_Score = ((yValue[ChosenLesson - 2] + DistrbutionRetv) * (int(TimerRecap(Retent_start + 2.0)[2])/60)) * 0.1
    eight_Score = ((yValue[ChosenLesson - 2] + DistrbutionRetv) * (int(TimerRecap(Retent_start + 2.0)[2])/60)) * 0.1
    ninth_Score = ((yValue[ChosenLesson - 2] + DistrbutionRetv) * (int(TimerRecap(Retent_start + 2.0)[2])/60)) * 0.1
    tenth_Score = ((yValue[ChosenLesson - 2] + DistrbutionRetv) * (int(TimerRecap(Retent_start + 2.0)[2])/60)) * 0.1

    if User_Lesson < 25:
        print("Please complete more than 25 lessons to access the performance analysis rating")
        sys.exit()
    else:
        print("I have small dick")
    RetentionScore = (first_Score + second_Score + thrid_Score + fourth_Score + fifth_Score + sixth_Score + seventh_Score + eight_Score + ninth_Score + tenth_Score) / 10
    print(f'Your Retention Score:{RetentionScore}')
    return RetentionScore

print("Code still running")
Get_Retentiveness(1, 1) #! issue might corrospond to here aswell, dont know 

if lesson_completed == True:
    User_Lesson += 1  

print(f'These are the X-Values:{xValue}') 
print(f'These are the Y-Values:{yValue}')