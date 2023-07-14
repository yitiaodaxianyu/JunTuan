
export const OnLanguageChange='LanguageChange';

export enum LanguageType{
    /**英语 */
    en = 0,
    /**中文 */
    zh = 1,
    /**印尼语 */
    id = 2,
    /**俄语 */
    be = 3,
    /**泰语 */
    th = 4,
    /**韩语 */
    kr = 5,
    num,
}

export enum LanguageIndex{
    NULL = 0,
    CRIT = 1,
    BEHEAD = 2,
    DODGE = 3,
    PARRY =4,
    KNOWING_BLOW=5,
    HEADSHOT=6,
    VERTIGO=7,
    PAUSED=8,
    CONTINUE=9,
    HOME=10,
    Skills_acquired=11,
    DANGER=12,
    MonsterManual=13,
    Number_of_kills=14,
    Feature=15,
    Click_to_claim=16,
    Milestone=17,
    Progress=18,
    Characteristics=19,
    Drag_your_hero_into_battle=20,
    The_hero_is_already_in_the_team=21,
    The_location_is_not_unlocked=22,
    At_least_one_hero=23,
    Attack_method=24,
    Name=25,
    Age=26,
    Sex=27,
    Information=28,
    Introduce=29,
    Upgrade=30,
    Backpack=31,
    Fast_Synthesis=32,
    Promotion=33,
    Insufficient_energy=34,
    Energy_is_full=35,
    Claim_Free=36,
    CLAIM_ALL=37,
    FREE_SPIN=38,
    Lucky_Spin=39,
    Setting=40,
    Language=41,
    Contact_us=42,
    Quit_the_game=43,
    Version=44,
    Change_avatar=45,
    OK=46,
    YES=47,
    NO=48,
    Do_you_really_want_to_quit_game=49,
    Start_game=50,
    Come_back_for_more_rewards_in=51,
    DAY1=52,
    DAY2=53,
    DAY3=54,
    DAY4=55,
    DAY5=56,
    DAY6=57,
    DAY7=58,
    CLAIM=59,
    CLAIMED=60,
    Seven_days_sign_in=61,
    Ranking=62,
    Daily_task=63,
    Hang_up_bonus=64,
    CLAIN_X5=65,
    FREE_CHEST=66,
    EQUIPMENT_CHEST=67,
    FRAGMENTED_CHEST=68,
    SUPER_CHEST=69,
    FREE=70,
    REDAY=71,
    COINS2500=72,
    Insufficient_gems=73,
    Insufficient_coins=74,
    WEAPON=75,
    Equipped=76,
    Change_Hero=77,
    Additional_Attributes=78,
    Replace=79,
    Not_Ativated=80,
    Reset=81,
    Melt=82,
    Drag_two_equipment_of_the_same_level_to_synthesize_a_higher_level_equipment=83,
    Reset_Attributes=84,
    GiveUp=85,
    Save=86,
    New_Equipment=87,
    Damage_Increased=88,
    ExclusiveAttributes=89,
    Promotion_Details=90,
    SuperSkill=91,
    HeroFragment=92,
    After_collecting_the_corresponding_equipment_consume_the_fragments_to_promote_the_rank=93,
    FragmentTransformation=94,
    Randomly_transform_into_fragments_of_other_heroes=95,
    Transform=96,
    MAX=97,
    Yard=98,
    Level=99,
    Go_to_the_following_page_to=100,
    Victory=101,
    Lost=102,
    Coin=103,
    shop=104,
    hero=105,
    fighting=106,
    pet=107,
    Map=108,
    Sign_in=109,
    Reach=110,
    Go=111,
    Speed_Up=112,
    Unlock_Now=113,
    Watch_ads_to_unlock_speed=114,
    Discover_new_species_please_be_prepared_for_battle=115,
    Warning=116,
    Jump_to_hero_page=117,
    A_New_Hero_Has_Joined_Your_Team=118,
    Attack=119,
    May_Get=120,
    AttackSpeed=121,
    ExplosiveAbility=122,
    Range=123,
    Skill=124,
    Rewards=125,
    CancelSkill=126,
    SaoDang=127,
    SaoDangTiShi=128,
    Resurrection=129,
    Clear_Raid_Immediately=130,
    PremiumAccount=131,
    OfflineEarnings20=132,
    Remove5ADS_Day=133,
    StartForFree=134,
    DingYueTip=135,
    Privacy_Policy=136,
    Day3free_trial=137,
    Week=138,
    Month=139,
    Year=140,
    Loading=141,
    DearVIPYou_got=142,
    ThisChallengeCanBeResurrected=143,
    RepairTheWalls=144,
    Defeat=145,
    Completed=146,
    Replay=147,
    Hero_damage_stats=148,
    Show_Damage=149,
    Welcome_Back=150,
    You_were_idle_for=151,
    Max_Reward=152,
    You_have_collected=153,
    IDLE_REWARD=154,
    Choose_to_acquire_2_skills=155,
    Refresh_skills=156,
    Unlock_All_Skill_Slots=157,
    The_skills_are_full=158,
    Skill_is_full=159,
    Acquired_skills=160,
    Guest=161,
    The_team_is_full=162,
    This_hero_is_unlocked_at=163,
    Team=164,
    Drag_the_avatar_to_change_the_position=165,
    Click_on_the_hero_to_join_the_team=166,
    previous_level=167,
    next_level=168,
    Enemy_lineup=169,
    Chapter=170,
    Active_Skill=171,
    Attack_Features=172,
    Can_attack_land_units=173,
    Can_attack_air_units=174,
    Can_attack_burrowing_units=175,
    Remaining=176,
    Waiting=177,
    Sold_out=178,
    Level_Up=179,
    Maximum_MP=180,
    MP_Recovery=181,
    Unlock_new_levels_after_complete=182,
    Unlock=183,
    Equipment=184,
    Castle=185,
    Talent=186,
    NotOpen=187,
    unload=188,
    merge=189,
    Unequip_All=190,
    Auto_Equip=191,
    Info=192,
    Gears=193,
    Promote=194,
    Evolve=195,
    The_hero_has_not_yet_obtained=196,
    first_reward=197,
    Idle_Times=198,
    You_can_claim_after=199,
    City=200,
    Insufficient_MP=201,
    Improve_combat_power=202,
    Function_Unlock=203,
    Free_3_times_claim=204,
    The_ad_failed_to_play_and_the_reward_cannot_be_obtained=205,
    ldle_Talent_Points=206,
    Next_Talent_Point_in=207,
    Faster=208,
    PlayerLevel=209,
    FunctionForecast=210,
    Close=211,
    Use=212,
    UsesRemainingToday=213,
    ResetsIn=214,
    Extra_50_Gems=215,
    FasterRewards=216,
    GetVip=217,
    EndlessChallenges=218,
    Play=219,
    Normal=220,
    Hard=221,
    BossHunting=222,
    TowerOfTrial=223,
    UnlockAfter=224,
    BuyChallengeTickets=225,
    Numberoftimestoday=226,
    RemainingToday=227,
    Cancel=228,
    GiveUpGame=229,
    SeasonEndIn=230,
    HighestStage=231,
    MyRank=232,
    RewardsLastWeek=233,
    BossComing=234,
    NoReward=235,
    RulesDescription=236,
    ClickAnywhereToCloseThePopup=237,
    Formation=238,
    LimitedTimeReward=239,
    PlayerLv=240,
    TheNumberOfPurchases=241,
    Collect=242,
    FreeGems=243,
    RefreshTime=244,
    DeluxeChest=245,
    SuperDeluxeChest=246,
    TapHereToViewChance=247,
    ChestDetails=248,
    GearChest=249,
    SuperGearChest=250,
    Blue=251,
    Elite=252,
    Legendary=253,
    Mythic=254,
    Bonus=255,
    CampaignInvestment=256,
    GrowthInvestment=257,
    Tips=258,
    AccumulateToClaimRewards=259,
    Value=260,
    BestValue=261,
    Sale=262,
    limit=263,
    Special=264,
    HotDeals=265,
    Daily=266,
    SelectYourWantedGifts=267,
    BattlePass=268,
    ContinueClaim=269,
    Day=270,
    Buygiftpackstoget=271,
    EndIn=272,
    Statistics=273,
    HeroDamage=274,
    PetDamage=275,
    BasicattackDamage=276,
    SkillDamage=277,
    Youcanincreaseyourstrengthby=278,
    Upgradehero=279,
    Raisepets=280,
    CumulativeCheckInDays = 281,
    CumulativeCheckIn = 282,
    AdditionalRewardsAvailable = 283,
    Choose=284,
    Buy=285,
    Capacity = 286,
    All = 287,
    Prop = 288,
    TheCurrentHPOfTheCityWall=289,
    GoldMallTip = 290,
}

export let AllLanguageString=[
    ['','',"","",""],//
    //0英语  1中文  2印尼语   3俄语    4泰语
    ['CRIT','暴 击',"CRIT","Критический удар","คริต"],// 1
    ['BEHEAD','斩 杀',"Tebas","Обезглавливание","ฆ่า"],//2
    ['DODGE','闪 避',"DODGE","Уклонение","หลบหลีก"],//3
    ['PARRY','格 挡',"PARRY","Блок","สกัดกั้น"],//4
    ['KNOWING BLOW','会心一击',"CRIT BLOW","Удар в сердце","โจมตีรู้ใจ"],//5
    ['HEADSHOT','爆 头',"HEADSHOT","Выстрел в голову","ระเบิดหัว"],//6
    ['VERTIGO','眩 晕',"STUN","Нокаут","วิงเวียน"],//7
    ['PAUSED','暂 停',"Pause","Пауза","หยุดชั่วคราว"],//8
    ['CONTINUE','继 续',"Lanjutkan","Продолжить","ต่อเนื่อง"],//9
    ['HOME','返回主页',"Kembali ke halaman utama","Вернуться на главную страницу","กลับไปหน้าหลัก"],//10
    ['Skills Acquired:','已获得的技能:',"Mendapatkan skill:","Полученные умения:","สกิลที่รับแล้ว:"],//11
    ['DANGER','危 险',"BAHAYA","Опасность","อันตราย"],//12
    ['Monster Manual','怪物图鉴',"Manual monster","Галерея монстров","รูปภาพมอนสเตอร์"],//13
    ['Number of kills:','击杀数',"Jumlah membunuh:","Количество убийств","จำนวนสังหาร"],//14
    ['Feature:','特 性:',"Karakteristik:","Особенности:","ลักษณะพิเศษ:"],//15
    ['Click to claim','点 击 领 取',"Tekan untuk klaim:","Нажми, чтобы получить","กดรับ"],//16
    ['Milestone','里程碑',"Pencapaian","Важный этап","บอกบอกระยะทาง"],//17
    ['Progress','进度',"Kemajuan","Прогресс","คืบหน้า"],//18
    ['Characteristics:','特性:',"Karakteristik:","Атрибут:","ลักษณะพิเศษ:"],//19
    ['Drag your hero into battle','拖动上阵你的英雄',"Tarik pahlawan ke pertarungan","Перетащи своего героя для начала сражения","ลากฮีโร่ของคุณออกรบ"],//20
    ['The hero has gone into battle','该英雄已经在队伍里',"Pahlawan ini sudah pergi ke pertarungan","Этот герой уже в команде","ฮีโร่นี้อยู่ในทีมแล้ว"],//21
    ['The location is not unlocked','该位置未解锁',"Lokasi ini tidak terkunci","Эта локация не разблокирована","ตำแหน่งนี้ยังไม่ปลดล็อค"],//22
    ['At least one hero','至少上阵一名英雄',"Minimal 1 pahlawan ke pertarungan","Для сражения необходим хотя бы один герой","อย่างน้อยมีฮีโร่ 1 คนออกรบ"],//23
    ['Attack method','攻击方式',"Metode serangan","Способ атаки","วิธีโจมตี"],//24
    ['Name','姓名',"Nama","Имя","ชื่อ"],//25
    ['Age','年龄',"Umur","Возраст","อายุ"],//26
    ['Sex','性别',"Jenis kelamin","Пол","เพศ"],//27
    ['Information','信息',"Informasi","Информация","ข้อมูล"],//28
    ['Introduce','介绍',"Pengenalan","Введение","แนะนำ"],//29
    ['Upgrade','升级',"Upgrade","Обновление","อัปเกรด"],//30
    ['Backpack','背包',"Ransel","Рюкзак","เป้"],//31
    ['Fast Synthesis','快速合成',"Sintesis cepat","Быстрый синтез","ผสานด่วน"],//32
    ['Promotion','晋升',"Naikkan ","Повышение","เลื่อนขั้น"],//33
    ['Insufficient energy','能量不足',"Energi tidak cukup","Недостаточно энергии","พลังไม่พอ"],//34
    ['Energy is full','能量已经满了',"Energi sudah penuh","Энергия уже полностью восстановлена","พลังเต็มแล้ว"],//35
    ['CLAIM FREE','免费领取',"Klaim gratis","Получить бесплатно","รับฟรี"],//36
    ['CLAIM ALL','领取所有',"Klaim semua","Получить все","รับทั้งหมด"],//37
    ['FREE SPIN','免费抽奖',"Spin gratis","Бесплатный розыгрыш призов","จับรางวัลฟรี"],//38
    ['Lucky Draw','幸运转盘',"Lucky Draw","Колесо фортуны","วงล้อโชคดี"],//39
    ['SETTING','设 置',"Pengaturan","Настройки","ตั้งค่า"],//40
    ['English','中 文',"Mandarin","Китайский язык","ภาษาจีน"],//41
    ['Contact Us','联 系 我 们',"Kontak kami","Свяжись с нами","ติดต่อพวกเรา"],//42
    ['Quit Game','退 出 游 戏',"Keluar game","Выйти из игры","ออกเกม"],//43
    ['Version','版 本',"Versi","Версия","เวอร์ชั่น"],//44
    ['Change Avatar','更改头像',"Ganti avatar","Изменить аватар","เปลี่ยนรูปโปรไฟล์"],//45
    ['OK','好的',"OK","OK","เรียบร้อยแล้ว"],//46
    ['YES','确 定',"YA","Подтвердить","ยืนยัน"],//47
    ['NO','取 消',"BATAL","Отмена","ยกเลิก"],//48
    ['Do you really want to quit game?','你真的要退出游戏吗？',"Apakah kamu ingin keluar dari game?","Ты действительно хочешь выйти из игры?","คุณต้องการออกจากเกมใช่ไหม?"],//49
    ['Start Challenge','开 始 挑 战',"Mulai tantangan","Начать","เริ่มท้าสู้"],//50
    ['Come Back For More Rewards In','回来领取更多的奖励',"Kembali untuk mengklaim lebih banyak hadiah","Возвращайся за новыми наградами","กลับมารับรางวัลที่มากขึ้น"],//51
    ['DAY1','第一天',"Hari pertama","День 1","วันที่ 1 "],//52
    ['DAY2','第二天',"Hari ke-2","День 2","วันที่ 2"],//53
    ['DAY3','第三天',"Hari ke-3","День 3","วันที่ 3"],//54
    ['DAY4','第四天',"Hari ke-4","День 4","วันที่ 4"],//55
    ['DAY5','第五天',"Hari ke-5","День 5","วันที่ 5"],//56
    ['DAY6','第六天',"Hari ke-6","День 6","วันที่ 6"],//57
    ['DAY7','第七天',"Hari ke-7","День 7","วันที่ 7"],//58
    ['CLAIM','领 取',"KLAIM","Получить","รับ"],//59
    ['CLAIMED','已 领 取',"SUDAH DIKLAIM","Уже получено","รับแล้ว"],//60
    ['Seven Days Sign In','七天签到',"Sign in 7 hari","Вход в игру в течение 7 дней","ลงชื่อ 7 วัน"],//61
    ['Ranking','排行榜',"Daftar peringkat","Рейтинг","อันดับ"],//62
    ['Daily Mission','每日任务',"Misi harian","Ежедневные задачи","ภารกิจรายวัน"],//63.
    ['Hang Up Bonus','挂 机 奖 励',"Hadiah AFK","Награда авторежима","รางวัล AI"],//64
    ['Claim X5','领 取 X5',"Klaim 5x","Получить X5","รับ X5"],//65
    ['FREE CHEST','免 费 宝 箱',"Peti harta gratis","Бесплатный сундук с сокровищами","หีบสมบัติฟรี"],//66
    ['EQUIPMENT CHEST','装 备 宝 箱',"Peti harta perlengkapan","Сундук с сокровищами и оснасткой","หีบสมบัติไอเทม"],//67
    ['FRAGMENTED CHEST','碎 片 宝 箱',"Peti hara fragmen","Сундук с сокровищами и фрагментами","หีบสมบัติชิ้นส่วน"],//68
    ['SUPER CHEST','超 级 宝 箱',"Peti harta super","Супер-сундук с сокровищами","หีบสมบัติซุปเปอร์"],//69
    ['FREE','免 费',"Gratis","Бесплатно","ฟรี"],//70
    ['READY','可 开 启',"Dapat dibuka","Можно открыть","สามารถเปิด"],//71
    ['2500 COINS','2500 金币',"2.500 Koin","2500 золотых монет","2500 โกลด์"],//72
    ['Insufficient Gems','钻石不足',"Berlian tidak cukup","Недостаточно алмазов","เพชรไม่พอ"],//73
    ['Insufficient Coins','金币不足',"Koin tidak cukup","Недостаточно золотых монет","โกลด์ไม่พอ"],//74
    ['WEAPON','武 器',"Senjata","Оружие","อาวุธ"],//75
    ['Equipped','已装备',"Sudah dipasang","Снаряжено","สวมแล้ว"],//76
    ['Change Hero','更换英雄',"Ganti pahlawan","Сменить героя","เปลี่ยนฮีโร่"],//77
    ['Additional Attributes','附加属性',"Atribut tambahan","Дополнительный атрибут","แนบคุณสมบัติ"],//78
    ['Replace','替 换',"Ganti","Замена","แทนที่"],//79
    ['None','未激活',"Belum aktif","Не активировано","ยังไม่เปิดใช้"],//80
    ['Reset','重置',"Atur ulang","Сброс","รีเซ็ต"],//81
    ['Melt','分 解',"Urai","Разобрать","สลาย"],//82
    ['Drag two equipment of the same level to synthesize a higher level equipment','拖动两个同级装备可合成高1级的装备',"Tarik 2 perlengkapan dengan level yang sama untuk dapat mensintesis perlengkapan yang lebih tinggi 1 level","Перетащи два предмета оснастки с одинаковым уровнем, чтобы синтезировать предмет оснастки на 1 уровень выше","ลากไอเทม 2 ชิ้นที่ระดับเดียวกัน สามารถผสานเป็นไอเทมที่สูงขึ้นอีก 1 ระดับ"],//83
    ['Reset Attributes','重 置 属 性',"Atur ulang atribut","Сбросить атрибут","รีเซ็ตคุณสมบัติ"],//84
    ['Give Up','放弃',"Buang","Сдаться","ละทิ้ง"],//85
    ['Save','保存',"Simpan","Сохранить","บันทึก"],//86
    ['New Equipment','新装备',"Perlengkapan baru","Новая оснастка","ไอเทมใหม่"],//87
    ['Damage Increased','伤害提升',"DMG meningkat","Увеличение урона","เสียหายเพิ่มขึ้น"],//88
    ['Exclusive Attributes','专属属性',"Atribut eksklusif","Особый атрибут","คุณสมบัติเฉพาะ"],//89
    ['Promotion Details','晋升详情',"Detail naik tingkat","Подробности повышения","รายละเอียดเลื่อนขั้น"],//90
    ['Super Skill','超级技能',"Skill super","Супер-умение","สกิลซุปเปอร์"],//91
    ['Hero Fragment','英雄碎片',"Fragmen Pahlawan","Фрагмент героя","ชิ้นส่วนฮีโร่"],//92
    ['After Collecting The Corresponding Equipment,Consume The Fragments To Promote The Rank','集齐对应的装备后，消耗碎片来晋升军衔',"Setelah mengumpulkan atribut yang sesuai, konsumsi fragmen untuk menaikkan pangkat","После того как ты соберешь соответствующую оснастку, воспользуйся фрагментами, чтобы повысить свой ранг","สะสมไอเทมที่เกี่ยวข้องครบ ใช้ชิ้นส่วนเลื่อนขั้นยศทหาร"],//93
    ['Fragment Transformation','碎片转化',"Transformasi Fragmen","Преобразовать фрагменты","แปลงชิ้นส่วน"],//94
    ['Randomly Transform Into Fragments Of Other Heroes','随机转化为其他英雄的碎片',"Mentransformasi menjadi fragmen pahlawan lain secara acak","Преобразование фрагментов в рандомные фрагменты других героев","สุ่มแปลงเป็นชิ้นส่วนฮีโร่อื่น"],//95
    ['Transform','转换',"Transformasi","Изменение","เปลี่ยน"],//96
    ['Max','满级',"Level Maks.","Полный уровень","เลเวลเต็มแล้ว"],//97
    ['Yard','码',"Kode","Код","หมายเลข"],//98
    ['Level','关卡',"Stage","Уровень ","ด่าน"],//99
    ['Go To The Following Page To Get Rewards To Improve Your Combat Power, And It Will Be Easier To Pass The Level','前往以下页面获取奖励提升战力，通关会更容易',"Pergi ke halaman berikut ini untuk mendapatkan hadiah yang meningkatkan kekuatan tempur, mempermudah menyelesaikan stage","Перейди на следующую страницу, чтобы получить награды, которые повысят твою боевую мощь и позволят облегчить прохождение уровня","ไปตามหน้าข้างล่าง รับรางวัลเพื่อเพิ่มพลังรบ ผ่านด่านยิ่งง่ายขึ้น"],//100
    ['Victory','胜利',"Menang","Победа","ชนะ"],//101
    ['Lost','输了',"Kalah","Проигрыш","แพ้แล้ว"],//102
    ['Coin','金币',"Koin tidak cukup","Золотые монеты","โกลด์"],//103
    ['Mall','商城',"Mal","Магазин","ร้านค้า"],//104
    ['Hero','英雄',"Pahlawan","Герой","ฮีโร่"],//105
    ['Battle','战 斗',"Pertarungan","Бой","ต่อสู้"],//106
    ['Pet','宠物',"Peliharaan","Питомец","สัตว์เลี้ยง"],//107
    ['Map','副本',"Dungeon","Квест","ดันเจี้ยน"],//108
    ['Sign In','签到',"Absen","Войти","เช็คชื่อ"],//109
    ['Reach','通关至',"Selesaikan stage hingga","Пройти","ผ่านด่านถึง"],//110
    ['Go','前往',"Pergi","Отправиться","มุ่งไป"],//111
    ['Speed Up','加速',"Percepat","Ускориться","เร่งความเร็ว"],//112
    ['Unlock Now','现在解锁',"Buka sekarang","Разблокировать сейчас","ปลดล็อคตอนนี้"],//113
    ['Watch Ads To Unlock 2x Speed','观看广告解锁2倍速度',"Tonton iklan untuk membuka 2x SPD","Посмотри рекламу, чтобы разблокировать 2-кратную скорость","ดูโฆษณาปลดล็อคระดับความเร็ว 2 เท่า"],//114
    ['Discover New Species,Please Be Prepared For Battle!','发现新物种,请做好战斗准备!',"Temukan spesies baru, bersiap-siaplah bertarung!","Найден новый вид, приготовься к бою!","พบสิ่งมีชีวิตชนิดใหม่ โปรดเตรียมตัวต่อสู้!"],//115
    ['Warning','警告',"Peringatan","Предупреждение","แจ้งเตือน"],//116
    ['Open To Hero Page','跳转到英雄页面',"Lompat ke halaman pahlawan","Перейди на страницу с героями","ข้ามไปยังหน้าฮีโร่"],//117
    ['A New Hero Has Joined Your Team And Can Be Brought Into Battle On The Hero Page','一名新的英雄加入了你的队伍，可以在英雄页面让其上阵',"Seorang pahlawan baru bergabung dengan timmu, dapat dimasukkan ke perang di halaman pahlawan","Новый герой присоединяется к твоей команде и может вступить в бой на странице с героями","มีฮีโร่ใหม่ 1 คนเข้าร่วมทีมของคุณ เลือกให้เขาออกรบได้จากในหน้าฮีโร่"],//118
    ['Attack','攻击',"ATK","Атака","โจมตี"],//119
    ['May Get','可能获得',"mungkin mendapatkan","может получить","มีแนวโน้มจะได้รับ"],//120
    ['Attack Speed','攻击速度',"ATK SPD","Скорость атаки","ระดับความเร็วโจมตี"],//121,
    ['Explosive Ability','爆发力',"Kekuatan Burst","Взрывная сила","แรงระเบิด"],//122,
    ['Range','范围',"Jangkauan","Дальность","ขอบเขต"],//123,
    ['Skill','大招',"Skill super","Сильнейшая атака","ท่าไม้ตาย"],//124,
    ['Rewards','获得奖励',"Mendapatkan hadiah","Полученные награды","ได้รับรางวัล"],//125,
    ['Cancel Skill','取消技能',"Batalkan skill","Отменить умение","ยกเลิกสกิล"],//126
    ['Clear Raid Level','扫荡关卡',"Selesaikan stage","Уровень зачистки","กวาดล้างด่าน"],//127
    ['You Must Clear This Raid Once To Enable This Function','您必须先通关一次才能使用此功能',"Anda harus menyelesaikan stage ini 1x untuk dapat menggunakan fitur ini","Для того чтобы воспользоваться этой функцией, нужно пройти уровень один раз","คุณต้องผ่านด่าน 1 ครั้งถึงจะใช้ฟังก์ชั่นนี้ได้"],//128
    ['Resurrection','复活次数',"Jumlah bangkit","Количество воскрешений","จำนวนครั้งฟื้นชีพ"],//129
    ['Clear Raid Immediately','开启扫荡',"Selesaikan stage secepatnya","Начало штурма","เริ่มกวาดล้าง"],//130
    ['Premium Account','至尊账号',"Akun premium","Почетный аккаунт","บัญชีระดับสูง"],//131
    ['+20% Offline Earnings','离线奖励增加20%',"Hadiah Offline meningkat 20%","Увеличение наград на 20% в режиме офлайн","รางวัลออฟไลน์เพิ่ม 20%"],//132
    ['Remove 5 Video ADS/Day And All Interstitial ADS','去除每日前5次视频广告和所有插屏广告',"Hapus 5 video iklan pertama dan iklan pengantara setiap harinya ","Убери первые 5 ежедневных видеореклам и все промежуточные рекламы","ลบ 5 วิดีโอโฆษณาแรกและโฆษณาแทรกของแต่ละวัน"],//133
    ['Start For Free','免费试用',"Percobaan gratis","Бесплатная пробная версия","ลองใช้ฟรี"],//134
    ["<color=#794825>This is an </c><color=#f4c221>Auto-renewable</color><color=#794825> subscription. Subscription is renewed unless turned off at least 24-hours before the period ends; account will be charged for renewal as well.You can turn it off in your Account Settings.Any unused portion of a free trial period, if offered, will be forfeited.when the user purchases a subscription to that publication, where applicable.</c>","<color=#794825>这是一个</c><color=#f4c221>自动更新</color><color=#794825>的订阅。如您未在订阅即将过期的 24 个小时前将其关闭，订阅将续订，帐户也将被收取续订费用。您可以随时在您的帐户设置中将其关闭。但与此同时，免费试用期的任何未使用部分（如果有的话）将被没收。当您使用本出版物的订阅时，则视为您同意接受。</c>","<color=#794825>Ini adalah</c> langganan <color=#f4c221>perbaruan otomatis</color><color=#794825>. Langganan akan tetap diperbarui jika tidak dimatikan 24 jam sebelum periode berakhir dan akun Anda akan dikenakan biaya perbaruan. Anda dapat mematikannya di pengaturan akun Anda kapan saja, tetapi di saat yang sama, bagian yang tidak dipakai selama masa percobaan gratis (Jika ada) akan diambil. Ketika Anda menggunakan langganan publikasi ini, akan dianggap Anda setuju untuk menerimanya.</c>","<color=#794825>Это подписка</c><color=#f4c221>с автоматическим</color><color=#794825>продлением. Если ты не отменишь подписку за 24 часа до истечения срока ее действия, подписка будет возобновлена, а с твоего счета будет снята плата за продление. Ты можешь отключить эту функцию в любое время в настройках своей учетной записи. Но при этом вся неиспользованная часть бесплатного пробного периода, если таковая имеется, будет аннулирована. Используя подписку на эту версию, ты соглашаешься с условиями подписки. </c>","<color=#794825>นี้คือการ</c><color=#f4c221>สมัครต่ออายุใช้งานอัตโนมัติ</color><color=#794825>หากท่านไม่ปิดการสมัครต่ออายุใช้งานภายใน 24 ชั่วโมงก่อนที่จะหมอายุการใช้งาน การสมัครจะทำการรต่ออายุ และบัญชีจะถูกเรียกเก็บค่าใช้งาน ท่านสามารถปิดได้ตลอดจากหน้าตั้งค่าในบัญชีของท่าน แต่ในขณะเดียวกัน ส่วนที่ยังไม่ได้ใช้ไปในของช่วงทดลองใช้ฟรี（ถ้ามี）จะถูกยึดคืน เมื่อท่านใช้งานของการสมัครนี้ ถือว่าท่านยินยอมที่จะยอมรับ</c>"],//135
    ['Privacy Policy and Terms of Use','隐私政策和使用条款',"Kebijakan privasi dan ketentuan penggunaan","Политика конфиденциальности и пользовательское соглашение","นโยบายความเป็นส่วนตัวและเงื่อนไขการใช้งาน"],//136
    ['3 Day Free Trial,Then ','3天免费试用,然后 ',"3 hari percobaan gratis, kemudian","3 дня бесплатной пробной версии, а затем ","ทดลองใช้ฟรี 3 วัน แล้วก็"],//137
    ['Week','周',"Minggu","Неделя","สัปดาห์"],//138
    ['Month','月',"Bulan","Месяц","เดือน"],//139
    ['Year','年',"Tahun","Год","ปี"],//140
    ['Loading...','加载中...',"Sedang memuat…","Идет загрузка...","กำลังโหลด..."],//141
    ['Dear VIP,You got rewards without watching ads.','尊敬的VIP，您不看广告也有奖励。',"VIP yang terhormat, Anda juga mendapatkan hadiah tanpa menonton iklan.","в качестве уважаемого VIP, ты также получаешь вознаграждение даже за то, что не смотришь рекламу.","VIP ที่เคารพ ถึงคุณไม่ดูโฆษณา ก็ยังได้รับรางวัล"],//142
    ['This Challenge Can Be Resurrected','本次挑战可以复活',"Dapat bangkit di tantangan kali ini","Этот бой можно начать заново","ท้าสู้ครั้งนี้สามารถคืนชีพได้"],//143
    ['Repair The Walls','修复城墙',"Perbaiki dinding","Восстановить городские стены","ซ่อมกำแพงเมือง"],//144
    ['Defeat','失败',"Gagal","Поражение","ล้มเหลว"],//145
    ['Completed','已完成',"Sudah selesai","Завершено","สำเร็จแล้ว"],//146
    ['Replay','重新挑战',"Ulang Pertempuran","Повторный бой","ท้าทายใหม่"],//147
    ['Hero Damage Stats','英雄伤害统计',"Statistik DMG Hero","Статистика урона героев","สถิติความเสียหายของฮีโร่"],//148
    ['Show Damage','显示伤害',"Tampilkan DMG","Показать урон","แสดงความเสียหาย"],//149
    ['Welcome Back!','欢迎回来!',"Selamat datang kembali!","С возвращением","ยินดีต้อนรับ"],//150
    ['You were idle for','你挂机了',"Kamu sudah AFK!","У вас в авторежиме","คุณAIเเล้ว"],//151
    ['Max Reward:','最大奖励:',"Hadiah Tertinggi","Максимальное награда","รางวัลใหญ่สุด"],//152
    ['You have collected:','你已经收集了:',"Kamu sudah mengumpulkan:","Вы собрали","คุณเก็บสะสมเเล้ว"],//153
    ['IDLE REWARD','挂机奖励',"挂机奖励","Hadiah AFK","Награда авторежима","รางวัลAI"],//154
    ['Choose to acquire 2 skills','选择获得2个技能',"Silakan pilih 2 skill yang didapatkan","Выберите приобретение 2 умения","เลือกรับ 2 สกิล"],//155
    ['Refresh Skills','刷新技能',"Refresh Skill","Обновить умения","รีเฟรชสกิล"],//156
    ['Unlock All Skill Slots','解锁所有技能槽',"Buka semua slot skill","Разблокировать все слоты умений","ปลดล็อคช่องสกิลทั้งหมด"],//157-20200114
    ['Not enough slots. Unlock new skill slots?','技能已满，是否解锁新的技能槽？',"Skill sudah penuh, apakah ingin membuka slot skill yang baru?","Умение уже заполнено, разблокировать новый слот умения?","สกิลเต็มแล้ว ปลดล็อกช่องสกิลใหม่หรือไม่?"],//158
    ['Not enough slots','技能已经满了',"Skill sudah penuh","Умение уже заполнено","สกิลเต็มแล้ว"],//159
    ['Skill Obtained','获得的技能',"Skill yang didapatkan","Получить умение","สกิลที่ได้รับ"],//160
    ['Traveler','游客',"Tamu","Гость","ผู้เข้าชม"],//161
    ['Team full','队伍已经满员了',"Tim sudah penuh","Команда уже заполнена","สมาชิกของทีมเต็มแล้ว"],//162
    ['This Hero unlocks at','该英雄解锁于',"Hero ini sudah terbuka","Этот герой разблокируется на","ฮีโร่นี้ปลดล็อก"],//163
    ['Deployed Team','出战队伍',"Tim yang bertempur","Команда для сражения","ทีมออกรบ"],//164
    ['Drag the Avatar Frame to change position','拖动头像更改站位',"Seret Avatar untuk mengganti posisi","Перетащи аватар, чтобы изменить положение","ลากรูปโปรไฟล์เพื่อเปลี่ยนตำแหน่ง"],//165
    ['Tap the Hero to join the team','点击英雄加入队伍',"Klik Hero untuk memasukkannya ke dalam tim","Нажми на героя, чтобы добавить его в состав команды","กดฮีโร่เข้าร่วมทีม"],//166    
    ['Last Level','上一关',"Babak Sebelumnya","Предыдущий уровень","ด่านก่อนหน้า"],//167
    ['Next Level','下一关',"Babak Selanjutnya","Следующий уровень","ด่านถัดไป"],//168
    ['Enemy Lineup','敌方阵容',"Formasi Musuh","Команда противника","ทัพฝ่ายศัตรู"],//169
    ['Chapter','章节',"Bab","Главы","บท"],//170
    ['Active Skill','主动技能',"Skill Otomatis","Активное умение","สกิลรุก"],//171
    ['Attack Effect','攻击特性',"Karateristik Serangan","Характеристики атаки","ลักษณะเฉพาะโจมตี"],//172
    ['Can attack land units','可以攻击陆地单位',"Bisa Menyerang Unit Darat","Можно атаковать сухопутные подразделения","สามารถโจมตีหน่วยพื้นดิน"],//173
    ['Can attack airborne units','可以攻击天空单位',"Bisa Menyerang Unit Udara","Можно атаковать воздушные подразделения","สามารถโจมตีหน่วยท้องฟ้า"],//174
    ['Can attack underground units','可以攻击遁地单位',"Bisa Menyerang Unit Bawah Tanah","Можно атаковать подземные подразделения","สามารถโจมตีหน่วยมุดดิน"],//175
    ['Remaining','剩余',"Sisa","Остаток","คงเหลือ"],//176
    ['Waiting','等待中',"Sedang Menunggu","Ожидание","รอสักครู่"],//177
    ['Sold out','售罄',"Habis Terjual","Нет в наличии","ขายหมดแล้ว"],//178
    ['Level Up','升级',"Naik tingkat","Уровень повышен","ยกระดับ"],//178
    ["Maximum MP:",'最大MP:',"MP maksimum:","Максимум МП:","MP สูงสุด:"],//180
    ["MP Recovery:",'MP回复:',"Pemulihan MP:","Восстановление MP:","การกู้คืน MP:"],//181
    ["Unlock new levels after complete campaign stage ",'可以解锁新的等级当通关 ',"Buka kunci level baru setelah menyelesaikan tahap kampanye","Разблокируйте новые уровни после завершения этапа кампании","ปลดล็อกด่านใหม่หลังจากผ่านด่านแคมเปญ"],//182
    ["Unlock:",'解锁:',"Membuka kunci:","Разблокировать:","ปลดล็อค:"],//183
    ["Equipment",'装备',"Peralatan","Оборудование","อุปกรณ์"],//184
    ["Castle",'城堡',"Kastil","замок","ปราสาท"],//185
    ["Talent",'天赋',"Bakat","Талант","ความสามารถพิเศษ"],//186
    ["Not Open",'未开放',"Tidak buka","Не открыто","ไม่เปิด"],//187
    ["Unload",'脱下',"Membongkar","Разгрузить","ยกเลิกการโหลด"],//188
    ["Merge",'合成',"Menggabungkan","Объединить","ผสาน"],//189
    ["Unequip All",'一键卸下',"Tidak Melengkapi Semua","Снять все","ถอดทั้งหมด"],//190
    ["Auto Equip",'一键穿戴',"Perlengkapan Otomatis","Автоматическое оснащение","อุปกรณ์ตกแต่งรถยนต์"],//191
    ["Info",'信息',"ข้อมูล","Информация","ข้อมูล"],//192
    ["Gears",'装备',"roda gigi","Шестерни","เกียร์"],//193
    ["Promote",'升星',"Memajukan","Продвигать","ส่งเสริม"],//194
    ["Evolve",'升阶',"Berkembang","Эволюционировать","วิวัฒนาการ"],//195
    ["The hero has not yet obtained",'该英雄尚未获得',"Pahlawan belum diperoleh","Герой еще не получил","ฮีโร่ยังไม่ได้รับ"],//196
    ["First Reward",'首次奖励',"Hadiah Pertama","Первая награда","รางวัลแรก"],//197
    ["Idle Times",'闲置时间',"Waktu Menganggur","Время простоя","เวลาว่าง"],//198
    ["You can claim rewards after idle for at least 1 hour","空闲至少1小时即可领取奖励 ","Anda dapat mengklaim hadiah setelah menganggur setidaknya selama 1 jam","Вы можете претендовать на награды после бездействия в течение как минимум 1 часа","คุณสามารถรับรางวัลหลังจากไม่ได้ใช้งานเป็นเวลาอย่างน้อย 1 ชั่วโมง"],//199
    ["City","主城","Kota","Город","เมือง"],//200
    ["Insufficient MP","MP不足","MP tidak mencukupi","Недостаточно МП","MP .ไม่เพียงพอ"],//201
    ["Improve combat power","提升战力","Tingkatkan kekuatan tempur","Улучшить боевую мощь","ปรับปรุงพลังการต่อสู้"],//202
    ["Function Unlock",'功能解锁',"Fungsi Buka Kunci","Разблокировка функций","ปลดล็อกฟังก์ชัน"],//203
    ["Free 3 times claim","免费3倍领取","Gratis 3 kali klaim","Бесплатная 3-кратная претензия","รับสิทธิ์ฟรี 3 ครั้ง"],//204
    ["The ad failed to play and the reward cannot be obtained","广告播放失败，无法获得奖励","Iklan gagal diputar dan hadiah tidak dapat diperoleh","Не удалось воспроизвести рекламу, и награда не может быть получена","โฆษณาล้มเหลวในการเล่นและไม่สามารถรับรางวัลได้"],//205
    ["ldle Talent Points:","闲置天赋点：","Poin Bakat menganggur:","свободные очки талантов:","คะแนนความสามารถที่ไม่ได้ใช้งาน:"],//206
    ["Next Talent Point in:","下一个天赋点：","Poin Bakat Berikutnya di:","Следующее очко таланта через:","จุดความสามารถต่อไปใน:"],//207
    ["Faster",'快速',"Lebih cepat","Быстрее","เร็วขึ้น"],//208
    ["Player Level","玩家等级","Tingkat Pemain","Уровень игрока","ระดับผู้เล่น"],//209
    ["Function Forecast","功能预告","Prakiraan Fungsi","Прогноз функции","ฟังก์ชั่นพยากรณ์"],//210
    ["Close","关闭","Menutup","Закрывать","ปิด I"],//211
    ["Use","使用","Menggunakan","Использовать","ใช้"],//212
    ["Uses Remaining Today: ","今日剩余使用次数: ","Penggunaan yang Tersisa Hari Ini:","Использование, оставшееся сегодня: ","ใช้ที่เหลืออยู่วันนี้: "],//213
    ["Resets In: ","重置倒计时：","Setel Ulang Dalam: ","Сброс через: ","รีเซ็ตใน: "],//214
    ["Extra +50 gems","额外+50钻石","Ekstra +50 permata","Дополнительные +50 драгоценных камней","พิเศษ +50 อัญมณี"],//215
    ["Faster Rewards","快速奖励","Hadiah Lebih Cepat","Более быстрые награды","รางวัลที่เร็วขึ้น"],//216
    ["Get VIP","获取VIP","Dapatkan VIP","Получить VIP","รับวีไอพี"],//217
    ["Endless Challenges","无尽挑战","Tantangan tak berujung","Бесконечные испытания","ความท้าทายที่ไม่มีที่สิ้นสุด"],//218
    ['Play','开始',"Bermain","Играть","เล่น"],//219
    ['Normal','普通',"Normal","Нормальный","ปกติ"],//220
    ['Hard','困难',"Keras","Жесткий","แข็ง"],//221
    ['Boss Hunting','Boss狩猎',"berburu bos","Охота на боссов","ล่าบอส"],//222
    ['Tower of Trial','试炼之塔',"Menara Percobaan","Башня Испытаний","หอคอยแห่งการพิจารณาคดี"],//223
    ['Unlock After：','解锁于：',"Buka Kunci Setelah","Разблокировать после","ปลดล็อคหลัง"],//224
    ['Buy Challenge Tickets','购买挑战券',"Beli Tiket Tantangan","Купить билеты на вызов","ซื้อบัตรท้าทาย"],//225
    ['Number of times today:',"今天可用:","Berapa kali hari ini:","Сколько раз сегодня:","จำนวนครั้งในวันนี้:"],//226
    ["RemainingToday:","今天剩余:","Sisa Hari Ini:","Осталось сегодня:","เหลือวันนี้:"],//227
    ['Cancel','取消',"Membatalkan","Отмена","ยกเลิก"],//228
    ["You won't get any rewards for quitting halfway through. Are you sure you want to give up the challenge?",'中途退出不会获得任何奖励，确定要放弃挑战吗？',"Anda tidak akan mendapatkan imbalan apa pun karena berhenti di tengah jalan. Apakah Anda yakin ingin melepaskan tantangan?","Вы не получите никаких наград за выход из игры на полпути. Вы уверены, что хотите сдаться?","คุณจะไม่ได้รับรางวัลใด ๆ สำหรับการลาออกครึ่งทาง คุณแน่ใจหรือไม่ว่าต้องการยกเลิกคำท้านี้"],//229
    ["Season End In:","赛季结束时间:","Musim Berakhir Dalam:","Окончание сезона через:","สิ้นสุดฤดูกาลใน:"],//230
    ["Highest Stage: ","最高关卡:","Tahap Tertinggi:","Высшая стадия:","เวทีสูงสุด:"],//231
    ["My Rank","我的排名","Peringkat saya","Мой ранг","อันดับของฉัน"],//232
    ["Rewards last week","上周的奖励","Hadiah minggu lalu","Награды прошлой недели","ของรางวัลอาทิตย์ที่แล้ว"],//233
    ["Boss Coming!!","Boss来袭!!","bos datang!!","Босс идет!!","บอสมา!!"],//234
    ["No reward","无奖励","Tidak ada imbalan","Без вознаграждения","ไม่มีรางวัล"],//235
    ["Rules Description","规则说明","Deskripsi Aturan","Описание правил","กฎ คำอธิบาย"],//236
    ["Click anywhere to close the popup","点击任意位置关闭弹窗","Klik di mana saja untuk menutup popup","Щелкните в любом месте, чтобы закрыть всплывающее окно","คลิกที่ใดก็ได้เพื่อปิดป๊อปอัป"],//237
    ["Formation","编队","Pembentukan","Формирование","รูปแบบ"],//238
    ["Time-limited rewards","限时奖励","Hadiah terbatas waktu","Ограниченные по времени награды","รางวัลจำกัดเวลา"],//239
    ["Player Lv.","Player Lv.","Player Lv.","Player Lv.","Player Lv."],//240
    ["The number of purchases in the store is refreshed every day~","商店购买次数每日刷新哦~","Jumlah pembelian di toko diperbarui setiap hari~","Количество покупок в магазине обновляется каждый день~","จำนวนการซื้อสินค้าในร้านจะรีเฟรชทุกวัน~"],//241
    ["Collect","收集","Mengumpulkan","Собирать","เก็บรวบรวม"],//242
    ["Free Gems","免费钻石","Permata Gratis","Бесплатные драгоценные камни","อัญมณีฟรี"],//243
    ["Refresh Time:","刷新时间:","Waktu Penyegaran:","Время обновления:","เวลารีเฟรช:"],//244
    ["Deluxe Chest","豪华宝箱","Dada Deluxe","Делюкс сундук","หีบดีลักซ์"],//245
    ["Super Deluxe Chest","超级豪华宝箱","Dada Super Deluxe","Сундук Супер Делюкс","หีบซุปเปอร์ดีลักซ์"],//246
    ["Tap here to view chance","点击此处查看爆率","Нажмите здесь, чтобы просмотреть шанс","Нажмите здесь, чтобы просмотреть шанс","แตะที่นี่เพื่อดูโอกาส"],//247
    ["Chest Details","宝箱详情","Detail Dada","Детали сундука","รายละเอียดหน้าอก"],//248
    ["Gear Chest","装备箱","peti gigi","Сундук с снаряжением","กล่องเกียร์"],//249
    ["Super Gear Chest","超级装备箱","Peti Super Gear","Сундук с супер снаряжением","หีบซุปเปอร์เกียร์"],//250
    ["Blue:","蓝色：","Biru:","Синий:","สีน้ำเงิน:"],//251
    ["Elite:","精英：","Elite:","Элита:","ผู้ลากมากดี:"],//252
    ["Legendary:","传奇：","Legendaris:","Легендарный:","ตำนาน:"],//253
    ["Mythic:","神话：","mitos:","Эпохальный:","เทพนิยาย:"],//254
    ["Bonus","返利","Bonus","Бонус","โบนัส"],//255
    ['Campaign Investment','通关返利',"Investasi Kampanye","Инвестиции в кампанию","แคมเปญการลงทุน"],//256
    ['Growth Investment','升级返利',"Investasi Pertumbuhan","Инвестиции в рост","การลงทุนเพื่อการเติบโต"],//257
    ['Tips','小贴士',"Tips","Чаевые","เคล็ดลับ"],//258
    ['Accumulate to Claim Rewards','累积领取奖励',"Akumulasi untuk Klaim Hadiah","Накопить, чтобы получить вознаграждение","สะสมเพื่อรับรางวัล"],//259
    ['Value','超值',"Nilai","Стоимость","คุ้ม"],//260
    ['Best Value','最划算',"Nilai terbaik","Лучшее соотношение","คุ้มค่าที่สุด"],//261
    ['Sale',"折扣","Diskon","Скидка","การลดราคา"],//262
    ["limit","限购","membatasi","ограничение","ขีดจำกัด"],//263
    ["Special","自选","Spesial","Специальный","พิเศษ"],//264
    ["Hot Deals","热卖","Penawaran Panas","Горячие предложения","ดีลสุดฮอต"],//265
    ["Daily","日常","Harian","Повседневная","รายวัน"],//266
    ["Select Your Wanted Gifts","选择您想要的礼物","Pilih Hadiah yang Anda Inginkan","Выберите желаемые подарки","เลือกของขวัญที่คุณต้องการ"],//267
    ["Battle Pass","战令","pas pertempuran","боевой пропуск","แบทเทิลพาส"],//268
    ["Continue Claim","继续领取","lanjutkan klaim","продолжить претензию","เรียกร้องต่อไป"],//269
    ['Day',"天","hari","день","วัน"],//270
    ["Buy gift packs to get","购买礼包可以获得","Beli paket hadiah untuk mendapatkan","Покупайте подарочные пакеты, чтобы получить","ซื้อชุดของขวัญเพื่อรับ"],//271
    ["End In","结束于","Akhiri","Конец в","สิ้นสุดใน"],//272
    ["Statistics","数据统计","Statistik","Статистика","สถิติ"],//273
    ["Hero Damage","英雄伤害","Kerusakan Pahlawan","Урон героя","ฮีโร่ดาเมจ"],//274
    ["Pet Damage","宠物伤害","Kerusakan Hewan Peliharaan","Повреждение питомца","ความเสียหายของสัตว์เลี้ยง"],//275
    ["Basic Attack Damage","普攻伤害","Kerusakan Serangan Dasar","Урон от базовой атаки","พลังโจมตีพื้นฐาน"],//276
    ["Skill Damage","技能伤害","Kerusakan Keterampilan","Урон навыка","สกิลดาเมจ"],//277
    ["You can increase your strength by","您可以通过以下方式提升实力","Anda dapat meningkatkan kekuatan Anda dengan","Вы можете увеличить свою силу","คุณสามารถเพิ่มความแข็งแกร่งของคุณโดย"],//278
    ["Upgrade hero","升级英雄","Tingkatkan pahlawan","Улучшить героя","อัพเกรดฮีโร่"],//279
    ["Raise pets","培养宠物","Angkat hewan peliharaan","Поднимите домашних животных","เลี้ยงสัตว์เลี้ยง"],//280
    ["Cumulative check-in days","累计签到天数","Kumulatif hari check-in","Совокупное количество дней регистрации","จำนวนวันเช็คอินสะสม"],//281
    ["Cumulative check-in","累计签到","Kumulatif check-in","Совокупная регистрация","เช็คอินสะสม"],//282
    ["Additional rewards available","可领取额外奖励","Hadiah tambahan tersedia","Доступны дополнительные награды","มีรางวัลเพิ่มเติมให้"],//283
    ["Choose","选择","Memilih","Выбирать","เลือก"],//284
    ["Buy","购买","Membeli","Купить","ซื้อ",],//285
    ["Capacity: ","容量：","kapasitas: ","вместимость: ","ความจุ: "],//286
    ["All","全部","semua","все","ทั้งหมด"],//287
    ["Prop","道具","Menopang","Проп","ข้อต่อ"],//288
    ["The current HP of the city wall","城墙当前HP","HP tembok kota saat ini","Текущий HP городской стены","HP ปัจจุบันของกำแพงเมือง"],//289
    
    
    
    
    

    
    
    







    
    
    
    
    



    
    


    
    
    




    
    
    
    

    

    





    
    





    





    
    



]

export enum SpriteIndex
{
    NULL=0,
    TY_logo_=1,
}

export let AllLanSpriteFrame=
[
    ['','',"","",""],//0
    ['TY_logo_en','TY_logo_cn',"","",""],//1
]

