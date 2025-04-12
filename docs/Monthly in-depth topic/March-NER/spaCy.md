# NLP using spaCy
---
## 1. basis
### 1.1 what is it
#### 1.1.1 spaCy
spaCy的核心就是**包含了自然语言处理流程的对象**。通常把这个变量叫做nlp。

```python
# 导入spaCy
import spacy

# 创建一个空白的中文nlp对象；可以像一个函数一样使用nlp对象来分析文本。
# 这个nlp对象包含了流程中的所有不同组件。
nlp = spacy.blank("zh")
```

#### 1.1.2 Doc对象
当我们用nlp对象来处理文本时，**spaCy会创建一个叫做Doc的对象**，这是"document"的缩写。 Doc可以让我们**用结构化的方式来读取文本相关的信息，并且不会有信息丢失**。
eg: 
```python
# 使用nlp对象处理一段文本并生成doc实例
doc = nlp("这是一个句子。")

# doc来就像一个正常的Python序列，可以遍历doc实例中的词符
for token in doc:
    print(token.text)
```

#### 1.1.3 Token对象
Token实例代表了**一个文本中的词符**，比如一个词或者一个标点符号。

要读取某一个位置的词符，我们可以直接**使用doc的索引**。

Token实例同时提供了**不同的属性**可以让我们读取词符的**其它信息**。 比如.text属性可以返回词符的原始文本。
```python
doc = nlp("这是一个句子。")

# 使用Doc索引读取单个词符
token = doc[1]

# 使用.text属性读取词符的文本
print(token.text)
```
::: details OUTPUT
一个
:::

#### 1.1.4 Span对象
一个Span实例是**文本包含了一个或更多的词符的一段截取**。 它仅仅是Doc的一个**视图**而**不包含实际的数据本身**。

要**创建一个span，我们可以使用Python截取的语法**。举个例子，1:3会创建一个从索引1开始 一直到索引3之前（不包括索引3）的词符截取。
```python
doc = nlp("这是一个句子。")

# 截取Doc的一部分就成为了Span实例
span = doc[1:3]

# 使用.text属性获取span的文本
print(span.text)
```
::: details OUTPUT
一个句子
:::

#### 1.1.5 词汇的属性
```python
doc = nlp("这个肉夹馍花了￥5。")

print("Index:   ", [token.i for token in doc])
print("Text:    ", [token.text for token in doc])

print("is_alpha:", [token.is_alpha for token in doc])
print("is_punct:", [token.is_punct for token in doc])
print("like_num:", [token.like_num for token in doc])
```

::: details OUTPUT
Index:    [0, 1, 2, 3, 4, 5, 6]  
Text:     ['这个', '肉夹馍', '花', '了', '￥', '5', '。']  
is_alpha: [True, True, True, True, False, False, False]  
is_punct: [False, False, False, False, False, False, True]  
like_num: [False, False, False, False, False, True, False]  
:::

- **i**是原始文本中的**词符索引值**。
- **text**返回词符的**文本**。
- **is_alpha，is_punct和like_num**都会*返回一个布尔值*，**检测词符是否有字母表字符组成、 是否是标点符号或者是否代表了一个数字**；举个例子，一个包含了1和0的词符"10"， 或者一个包含了T,E,N三个字母的词组"ten"。
- 这些属性也被叫做词汇属性：他们仅仅代表了*词典中元素的特性，而与词符所在的语义情境无关。*


### 1.2 训练流程
#### 1.2.1 流程的定义
很多非常有趣的分析是**基于语境**的： 比如一个词是否是动词，或者文本的一段跨度是否是人名。

在spaCy中，已经有很多由大量标注过的文本例子训练而成的流程。

流程组件中所包含的**统计模型**让spaCy可以通过语境来做抽取。抽取结果通常包括：
- 词性标注
- 依存关系
- 命名实体

流程可以输入更多的标注数据来优化结果，常见的应用是用特定数据优化用户需要的特定场景。

#### 1.2.2 流程包
可以用spacy download命令下载训练好的流程包，如"zh_core_web_sm"这个流程包就是一个小的中文模型，它有所有核心功能，是从网上的文本训练而来。：
```bash
python -m spacy download zh_core_web_sm
```
下载好流程包后，通过spacy.load方法，通过包名读取一个流程包并返回一个nlp实例。
```python 
import spacy

nlp = spacy.load("zh_core_web_sm")
```
一个训练好的流程/模型，包含如下信息：
- 二进制权重：用这些权重可以做出模型预测实现信息抽取
- 词汇表
- 元信息
- 配置文件

#### 1.2.3 词性标注
对处理后的文本得到的词符，可以通过 ==.pos_=={.info}属性读取其词性标注的结果。
```python
import spacy

# 读取小版本的中文流程
nlp = spacy.load("zh_core_web_sm")

# 处理文本
doc = nlp("我吃了个肉夹馍")

# 遍历词符
for token in doc: # [!code word:pos_]
    # Print the text and the predicted part-of-speech tag
    print(token.text, token.pos_)
```
::: details OUTPUT
我 PRON  
吃 VERB  
了 PART  
个 NUM  
肉夹馍 NOUN  
:::
#### 1.2.4 依存关系解析
依存关系，即词与词之间的关系。比如一个词是某一个句子或者物体的主语。

==.dep_=={.info}属性返回预测的<u>依存关系标注</u>。

==.head=={.info}属性返回<u>句法头词符</u>。你可以认为这是词在句子中所依附的母词符。

```python
for token in doc: # [!code word:dep_]
    print(token.text, token.pos_, token.dep_, token.head.text)
```
::: details OUTPUT
我 PRON nsubj 吃  
吃 VERB ROOT 吃  
了 PART aux:asp 吃  
个 NUM nummod 肉夹馍  
肉夹馍 NOUN dobj 吃  
:::
#### 1.2.5 命名实体识别
通过 ==doc.ents=={.info}，返回一个<u>Span实例</u>的遍历器；可以通过 ==.label_=={.info}属性读取模型预测出的所有命名实体以及**实体标注**。
```python
# 处理文本
doc = nlp("微软准备用十亿美金买下这家英国的创业公司。")

# 遍历识别出的实体
for ent in doc.ents:# [!code word:label_]
    # 打印实体文本及其标注
    print(ent.text, ent.label_)
```
::: details OUTPUT
微软 ORG  
十亿美金 MONEY  
英国 GPE  
:::