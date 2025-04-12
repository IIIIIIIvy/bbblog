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
# 会输出"一个"
print(token.text)
```

#### 1.1.4 Span对象
一个Span实例是**文本包含了一个或更多的词符的一段截取**。 它仅仅是Doc的一个**视图**而**不包含实际的数据本身**。

要**创建一个span，我们可以使用Python截取的语法**。举个例子，1:3会创建一个从索引1开始 一直到索引3之前（不包括索引3）的词符截取。
```python
doc = nlp("这是一个句子。")

# 截取Doc的一部分就成为了Span实例
span = doc[1:3]

# 使用.text属性获取span的文本
# output："一个句子"
print(span.text)
```

#### 1.1.5 词汇的属性
```python
doc = nlp("这个肉夹馍花了￥5。")

print("Index:   ", [token.i for token in doc])
print("Text:    ", [token.text for token in doc])

print("is_alpha:", [token.is_alpha for token in doc])
print("is_punct:", [token.is_punct for token in doc])
print("like_num:", [token.like_num for token in doc])

# output:
# Index:    [0, 1, 2, 3, 4, 5, 6]
# Text:     ['这个', '肉夹馍', '花', '了', '￥', '5', '。']

# is_alpha: [True, True, True, True, False, False, False]
# is_punct: [False, False, False, False, False, False, True]
# like_num: [False, False, False, False, False, True, False]
```

- **i**是原始文本中的**词符索引值**。
- **text**返回词符的**文本**。
- **is_alpha，is_punct和like_num**都会*返回一个布尔值*，**检测词符是否有字母表字符组成、 是否是标点符号或者是否代表了一个数字**；举个例子，一个包含了1和0的词符"10"， 或者一个包含了T,E,N三个字母的词组"ten"。
- 这些属性也被叫做词汇属性：他们仅仅代表了*词典中元素的特性，而与词符所在的语义情境无关。*
