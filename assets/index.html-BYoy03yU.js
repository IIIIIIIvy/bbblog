import{_ as t,c as o,b as e,o as a}from"./app-sbUeO-rO.js";const s={};function r(p,n){return a(),o("div",null,n[0]||(n[0]=[e(`<hr><h2 id="_1-basis" tabindex="-1"><a class="header-anchor" href="#_1-basis"><span>1. basis</span></a></h2><h3 id="_1-1-what-is-it" tabindex="-1"><a class="header-anchor" href="#_1-1-what-is-it"><span>1.1 what is it</span></a></h3><h4 id="_1-1-1-spacy" tabindex="-1"><a class="header-anchor" href="#_1-1-1-spacy"><span>1.1.1 spaCy</span></a></h4><p>spaCy的核心就是<strong>包含了自然语言处理流程的对象</strong>。通常把这个变量叫做nlp。</p><pre><code># 导入spaCy
import spacy

# 创建一个空白的中文nlp对象；可以像一个函数一样使用nlp对象来分析文本。
# 这个nlp对象包含了流程中的所有不同组件。
nlp = spacy.blank(&quot;zh&quot;)
</code></pre><h4 id="_1-1-2-doc对象" tabindex="-1"><a class="header-anchor" href="#_1-1-2-doc对象"><span>1.1.2 Doc对象</span></a></h4><p>当我们用nlp对象来处理文本时，<strong>spaCy会创建一个叫做Doc的对象</strong>，这是&quot;document&quot;的缩写。 Doc可以让我们<strong>用结构化的方式来读取文本相关的信息，并且不会有信息丢失</strong>。 eg:</p><pre><code># 使用nlp对象处理一段文本并生成doc实例
doc = nlp(&quot;这是一个句子。&quot;)

# doc来就像一个正常的Python序列，可以遍历doc实例中的词符
for token in doc:
    print(token.text)
</code></pre><h4 id="_1-1-3-token对象" tabindex="-1"><a class="header-anchor" href="#_1-1-3-token对象"><span>1.1.3 Token对象</span></a></h4><p>Token实例代表了<strong>一个文本中的词符</strong>，比如一个词或者一个标点符号。</p><p>要读取某一个位置的词符，我们可以直接<strong>使用doc的索引</strong>。</p><p>Token实例同时提供了<strong>不同的属性</strong>可以让我们读取词符的<strong>其它信息</strong>。 比如.text属性可以返回词符的原始文本。 doc = nlp(&quot;这是一个句子。&quot;)</p><pre><code># 使用Doc索引读取单个词符
token = doc[1]

# 使用.text属性读取词符的文本
# 会输出&quot;一个&quot;
print(token.text)
</code></pre><h4 id="_1-1-4-span对象" tabindex="-1"><a class="header-anchor" href="#_1-1-4-span对象"><span>1.1.4 Span对象</span></a></h4><p>一个Span实例是<strong>文本包含了一个或更多的词符的一段截取</strong>。 它仅仅是Doc的一个<strong>视图</strong>而<strong>不包含实际的数据本身</strong>。</p><p>要<strong>创建一个span，我们可以使用Python截取的语法</strong>。举个例子，1:3会创建一个从索引1开始 一直到索引3之前（不包括索引3）的词符截取。</p><pre><code>doc = nlp(&quot;这是一个句子。&quot;)

# 截取Doc的一部分就成为了Span实例
span = doc[1:3]

# 使用.text属性获取span的文本
# output：&quot;一个句子&quot;
print(span.text)
</code></pre><h4 id="_1-1-5-词汇的属性" tabindex="-1"><a class="header-anchor" href="#_1-1-5-词汇的属性"><span>1.1.5 词汇的属性</span></a></h4><pre><code>doc = nlp(&quot;这个肉夹馍花了￥5。&quot;)

print(&quot;Index:   &quot;, [token.i for token in doc])
print(&quot;Text:    &quot;, [token.text for token in doc])

print(&quot;is_alpha:&quot;, [token.is_alpha for token in doc])
print(&quot;is_punct:&quot;, [token.is_punct for token in doc])
print(&quot;like_num:&quot;, [token.like_num for token in doc])

# output:
# Index:    [0, 1, 2, 3, 4, 5, 6]
# Text:     [&#39;这个&#39;, &#39;肉夹馍&#39;, &#39;花&#39;, &#39;了&#39;, &#39;￥&#39;, &#39;5&#39;, &#39;。&#39;]

# is_alpha: [True, True, True, True, False, False, False]
# is_punct: [False, False, False, False, False, False, True]
# like_num: [False, False, False, False, False, True, False]
</code></pre><ul><li><strong>i</strong>是原始文本中的<strong>词符索引值</strong>。</li><li><strong>text</strong>返回词符的<strong>文本</strong>。</li><li><strong>is_alpha，is_punct和like_num</strong>都会<em>返回一个布尔值</em>，<strong>检测词符是否有字母表字符组成、 是否是标点符号或者是否代表了一个数字</strong>；举个例子，一个包含了1和0的词符&quot;10&quot;， 或者一个包含了T,E,N三个字母的词组&quot;ten&quot;。</li><li>这些属性也被叫做词汇属性：他们仅仅代表了<em>词典中元素的特性，而与词符所在的语义情境无关。</em></li></ul>`,21)]))}const c=t(s,[["render",r]]),l=JSON.parse('{"path":"/article/tmy1rzrk/","title":"spaCy","lang":"en-US","frontmatter":{"title":"spaCy","createTime":"2025/04/05 10:27:47","permalink":"/article/tmy1rzrk/"},"headers":[],"readingTime":{"minutes":2.49,"words":747},"git":{"updatedTime":1743848839000,"contributors":[{"name":"Nini","username":"Nini","email":"nwen@radioflyer.com","commits":1,"avatar":"https://avatars.githubusercontent.com/Nini?v=4","url":"https://github.com/Nini"}]},"filePathRelative":"Monthly in-depth topic/March-NER/spaCy.md","categoryList":[{"id":"6abc3d","sort":10000,"name":"Monthly in-depth topic"},{"id":"c4cb51","sort":10001,"name":"March-NER"}]}');export{c as comp,l as data};
