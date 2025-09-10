

# **MBTI 讲话对策集：产品需求文档 (PRD) V1.0**

## **文档控制**

| 属性 | 详情 |
| :---- | :---- |
| **版本** | 1.0 |
| **状态** | 草案 |
| **作者** | 高级产品经理 |
| **最后更新日期** | 2024年5月21日 |
| **核心团队** | 产品负责人、UI/UX 设计师、前端开发工程师 |

---

## **1.0 产品愿景与战略背景**

本章节旨在阐明产品的核心“为何”，为整个团队构建统一的认知与目标。确保每一个功能设计与技术决策都服务于产品的中心使命，是维持项目专注度和最终成功的关键 1。

### **1.1 问题陈述：沟通的鸿沟**

沟通本质上是一门复杂的艺术。迈尔斯-布里格斯类型指标 (MBTI) 提供了一个理解人类性格差异的框架，揭示了不同性格类型在信息处理和沟通偏好上存在根本性的不同。一个核心问题由此产生：同样一句话，对于逻辑驱动、追求效率的 INTJ 来说可能清晰明了，但对于价值驱动、注重情感共鸣的 INFP 而言，则可能显得冷漠甚至带有冒犯性 4。  
这种沟通风格的错位，在个人生活和职业场景中频繁导致误解、摩擦和协作效率的降低。用户在需求中准确地将其描述为一个“难题”。这种摩擦的负面影响是深远的，可能导致团队士气低落、项目进展停滞，乃至个人关系的紧张。目前市场上的解决方案多为泛泛而谈的理论文章或建议，缺乏一个能够针对具体对话场景提供实时、可操作帮助的工具。

### **1.2 产品愿景：您的私人沟通策略师**

**愿景声明：** 赋能个体，通过将其自然的表达方式智能地转换为任何 MBTI 性格类型所偏好的沟通语言，从而实现更有效、更具同理心的交流。  
本应用将扮演一个“语言学与情感学的翻译器”角色。它翻译的不是不同国家的语言，而是不同心理认知模式下的沟通偏好。它的核心使命是搭建一座桥梁，跨越意图与感知之间的鸿沟，让每一次沟通都更接近其本意。

### **1.3 核心价值主张：促进共情，提升效能**

* **对于使用者：** 通过定制化信息，帮助用户在棘手的对话中建立自信，改善职业与个人关系，并更高效地达成沟通目标。  
* **对于接收者：** 由于信息以其偏好的风格传递，接收者会感到被倾听、被理解和被尊重，从而建立更积极的互动关系。  
* **最终目标：** 超越简单的“沟通技巧”，提供一个动态、智能的工具，旨在培养人与人之间真正的理解与联结。

### **1.4 成功指标 (KPIs)**

预先定义成功是任何产品发布的基石 6。鉴于本产品 V1.0 是一个纯前端、无用户账户的应用，其成功指标将聚焦于用户参与度和感知价值。

* **主要指标：**  
  * **转化率 (Transformation Rate):** 定义为“成功的文本转化次数 / 总会话数”。高转化率直接反映了用户对核心功能的积极使用和依赖。  
* **次要指标：**  
  * **复制转化比 (Copy-to-Transformation Ratio):** 定义为“‘复制’按钮点击次数 / 成功的文本转化次数”。该指标可作为衡量生成文本实用性和质量的代理指标。高比率意味着用户认为生成的内容有价值，并计划在实际场景中使用。  
  * **平均会话时长 (Average Session Duration):** 用户在应用上花费的平均时间。较长的会话时长可能表明用户在深入探索不同性格类型的沟通策略，参与度更高。  
  * **定性反馈 (未来功能):** 在界面中加入一个简单的“这次转换有帮助吗？(👍/👎)”反馈机制，用以直接收集用户对转化质量的情感反馈，为后续的模型优化和提示词工程提供数据支持。

---

## **2.0 用户画像与场景分析**

本章节通过构建一个 relatable (有共鸣的) 用户画像，并描绘其在真实世界中的应用场景，将抽象的问题具体化、人性化。这确保了团队在开发过程中始终以用户为中心，专注于解决用户的核心痛点 2。

### **2.1 核心用户画像：“用心沟通者”**

* **姓名：** 吴彦祖  
* **基本信息：** 年龄 28-40 岁，在协作密切的知识型行业工作，如科技、市场营销、咨询等。  
* **心理特征：** 具备较高的自我认知能力，重视个人成长，对 MBTI、情商、有效沟通等概念有一定了解。她积极主动地寻求提升自己的人际交往能力。  
* **目标：**  
  * 以更优雅、更有效的方式处理复杂的职场人际关系。  
  * 以一种激励而非打击的方式向团队成员提供反馈。  
  * 通过避免常见的沟通陷阱来巩固个人情感关系。  
* **痛点：**  
  * “和某些人说话时，我总感觉如履薄冰。”  
  * “我自认为有帮助的直接反馈，有时却事与愿违，反而冒犯了同事。”  
  * “我知道我*想*说什么，但我不知道该*如何*对‘他/她’说。”

### **2.2 关键用户场景 (用户故事)**

用户故事为功能的开发提供了必要的上下文，帮助团队理解其对用户的实际影响 1。这些场景将直接指导 UI/UX 设计和 AI 提示词工程。

#### **2.2.1 场景 A：向敏感的同事提出修改意见**

* **用户：** 吴彦祖，一位项目经理 (性格可能偏向 xNTx)。  
* **沟通对象：** 团队中的一位设计师，性格为 INFP 5。  
* **情境：** 设计师最新提交的设计稿未能完全符合项目的核心需求。吴彦祖需要在不打击其工作热情和自信心的情况下，提出关键的修改意见。  
* **原始表达 (吴彦祖的自然风格):** “新设计不符合需求文档里的规定。我们需要重新做，重点要突出用户流程 A、B 和 C。请在明天 EOD 前提交新版本。”  
* **在应用中的操作流程：**  
  1. 吴彦祖打开“MBTI 讲话对策集”应用。  
  2. 在目标人格选择器中，她选择了“INFP”。界面上出现一个简短的提示：“重视和谐、个人意义和鼓励。不喜欢苛刻的批评。”  
  3. 吴彦祖将她的原始表达输入到文本框中。  
  4. 点击“转换”按钮。  
  5. **应用输出 (转换后的表达):** “我非常欣赏你投入在这些设计中的创造力，能看到其中蕴含的独特想法。为了确保我们与项目的核心目标完全对齐，我们是否可以一起探讨一下如何更好地融合用户流程 A、B 和 C？我相信以你的视角，一定能让这些流程变得更出色。我们明天约个时间一起 brainstorm 一下吧。”  
  6. 吴彦祖复制了这段文字，感觉对于即将开始的对话更有信心了。

#### **2.2.2 场景 B：为注重逻辑的管理者准备项目提案**

* **用户：** 吴彦祖，一位市场专员 (性格可能偏向 xNFx)。  
* **沟通对象：** 她的部门总监，性格为 ESTJ 11。  
* **情境：** 吴彦祖有一个绝佳的新营销活动创意，但她知道她的上司更看重数据、效率和清晰的计划，而非抽象的概念和感性的描述。  
* **原始表达 (吴彦祖的自然风格):** “我有一个非常激动人心的营销活动想法，我觉得它能真正从更深的层次上与我们的用户建立连接，并围绕我们的品牌打造一个更强大的社区。这个活动的核心是为用户创造一段情感之旅。”  
* **在应用中的操作流程：**  
  1. 吴彦祖选择“ESTJ”作为目标人格。提示信息显示：“重视结构、事实和清晰可行的计划。不喜欢模糊性和纯粹的情感论证。”  
  2. 她输入了原始的表达。  
  3. 点击“转换”按钮。  
  4. **应用输出 (转换后的表达):** “新营销活动提案：目标是在第三季度将用户活跃度提升 15%。计划包含三个明确步骤：1) 投放精准社交媒体广告 (预计 ROI 为 3:1)；2) 举办一场行业专家网络研讨会；3) 实施数据驱动的邮件跟进序列。申请 20 分钟会议，以审阅附件中的详细项目计划和预算。”  
  5. 吴彦祖利用这个结构化的输出，起草了一封逻辑清晰、目标明确的正式提案邮件。

#### **2.2.3 沟通能力的“脚手架”**

上述场景揭示了产品更深层次的价值。用户并非简单地复制粘贴文本，而是将应用的输出作为一种模型或起点。从“死板的解决方案”到“安慰的话语”的转换，不仅仅是词汇的替换，更是整个沟通框架 (framing) 的重塑。这意味着，该应用的真正价值在于其教育意义——它在潜移默化中教会用户如何从他人的视角思考问题。  
因此，本应用扮演了培养用户人际交往能力的“脚手架”角色。它为用户提供了一个安全的练习场，帮助他们构建更具同理心和策略性的沟通模式。未来的产品迭代可以进一步强化这一特性，例如，通过高亮显示关键的措辞变化，并解释其背后的心理学原理（例如，“此处添加赞赏的语句，因为 INFP 类型对肯定和鼓励有积极的回应” 5），从而将产品从一个纯粹的工具提升为一个个人发展与赋能平台。  
---

## **3.0 功能性需求与特性 (V1.0)**

本章节详细定义了产品的“什么”，即需要构建的具体功能和特性。每一项需求都以可测试、可验证的方式进行陈述 3。

### **3.1 特性：目标人格选择**

* **FR-1.1:** 用户界面 (UI) **必须**提供一个清晰、可交互的组件，用于选择 16 种 MBTI 人格类型中的一种。  
* **FR-1.2:** 该选择机制**应当**具有视觉吸引力，例如使用卡片式网格或风格化的下拉菜单，以符合简约美学的设计风格 13。  
* **FR-1.3:** 当用户选择一种人格类型后，界面**必须**明确地指示当前的选择状态（例如，高亮选中的卡片）。  
* **FR-1.4:** 选择人格类型后，界面**应当**出现一个简短、非侵入式的描述（1-2句话），总结其核心沟通偏好。这为用户提供了即时上下文，并强化了其选择的正确性（例如，对于 INTJ：“偏好直接、逻辑清晰和客观的沟通。请聚焦于‘为什么’和解决方案。” 4）。

### **3.2 特性：文本输入与转换**

* **FR-2.1:** UI **必须**提供一个多行文本输入区域，供用户输入其原始信息。  
* **FR-2.2:** 文本输入区**应当**包含一个不显眼的字符计数器，为用户提供反馈，并设定一个最大字符数限制（例如 1000 字符），以便管理 API 调用成本和响应时间。  
* **FR-2.3:** **必须**存在一个标签清晰、易于点击的按钮（例如，“转换”、“优化表达”、“适配风格”）来触发 API 调用。  
* **FR-2.4:** 如果用户未选择目标人格或输入框为空，则“转换”按钮**必须**处于禁用状态，以防止无效的 API 请求。  
* **FR-2.5:** 在 Gemini API 处理请求期间，UI **必须**显示一个加载状态（例如，按钮上出现一个精细的加载动画或呼吸效果），向用户明确传达系统正在工作的反馈 15。

### **3.3 特性：转换结果展示**

* **FR-3.1:** Gemini API 返回的转换后文本**必须**显示在一个清晰的、只读的输出区域，该区域在视觉上应与输入区域有明显区分。  
* **FR-3.2:** UI **必须**包含一个“复制”按钮，当用户点击时，能将输出区域的全部文本复制到用户的剪贴板。  
* **FR-3.3:** “复制”按钮在成功执行复制操作后，**应当**提供视觉反馈（例如，按钮文本在 2 秒内变为“已复制！”）。  
* **FR-3.4:** UI **必须**包含一个“清空”或“重置”按钮，该按钮能一键清除输入文本、输出文本并取消已选的人格类型，方便用户快速开始一次新的转换。

---

## **4.0 MBTI 转换引擎：AI 提示词与逻辑**

这是本应用的技术与智慧核心。产品的成败与提示词 (Prompt) 的质量直接相关。本章节将详细记录提示词的架构，将我们对 MBTI 沟通风格的深度研究，转化为给 AI 的具体、可执行的指令。

### **4.1 核心技术：Gemini API**

根据用户的技术选型，本项目将使用 Gemini API。为实现对语境、语气和微妙指令的精准理解，我们将选用为复杂语言任务优化的模型（例如 Gemini 1.5 Pro）。应用将通过客户端发起对 Gemini API 端点的调用，发送一个复合提示词，该提示词包含系统指令、用户输入文本以及目标 MBTI 的沟通档案。

### **4.2 系统提示词架构**

发送给 API 的提示词将根据用户的选择动态构建，其结构如下：

1. **角色定义 (Role Definition):** 你是一位精通 MBTI 人格框架的沟通专家。你的任务是根据特定的性格类型偏好，重写用户提供的信息，使其更易于被目标对象所接受。  
2. **目标档案 (Target Profile):** 沟通的目标人格是。以下是该类型的核心沟通风格总结：。  
3. **核心指令 (Core Instruction):** 请根据上述沟通风格，重写以下用户输入的信息。你需要保留原始信息的核心意义和意图，但调整其语气、结构和措辞。不要添加原文中未包含的新信息，仅做转述和优化。  
4. **用户输入 (User's Message):** 用户原文：'\[用户输入的文本\]'  
5. **输出约束 (Output Constraint):** 你的回答必须且仅包含重写后的文本，不要附加任何额外的评论、解释或前缀。

在设计提示词时，一个关键点是明确告知 AI *不要*做什么。生成式 AI 模型在初期测试中常常表现出“过度热情”的倾向，例如会主动添加新观点、提出反问或解释自己的修改逻辑。然而，用户的核心需求是获得一段干净、可直接复制使用的文本。任何多余的字符都会增加用户的使用摩擦。因此，在提示词架构中加入“输出约束”这一负向指令，是确保 API 返回结果能够被前端直接渲染、无需复杂解析的关键，这极大地简化了前端的开发逻辑。

### **4.3 MBTI 沟通提示词矩阵 (示例)**

此矩阵是实现产品核心功能的基石，它将所有关于 MBTI 沟通风格的研究成果，系统化地编码为可操作的 AI 指令。它将成为开发人员实现提示词逻辑的权威指南，也是未来进行测试和优化的基础。

| MBTI 类型 | 核心沟通价值观 | AI 应模仿/使用的关键词 | AI 应避免/移除的关键词 | Gemini 系统提示词片段 |
| :---- | :---- | :---- | :---- | :---- |
| **INTJ** | 逻辑与战略效率 | 客观、逻辑、直达重点、洞察、挑战、成本效益、后果、战略 4 | 情感诉求、“我感觉”、闲聊、模糊不清、反复论证、个人化 4 | 将文本重写得直接、有逻辑，并聚焦于客观的解决方案。移除所有情感化语言、社交客套话和主观陈述。清晰地构建论点，并立即切入主题。将其构建成一份富有洞察力的分析或一项战略性提议。 |
| **INFP** | 个人意义与和谐 | 鼓励、肯定、积极的、宏大愿景、个人意义、价值观、感受、温和的 5 | 苛刻的批评、命令式语气、过于关注细节、非个人化、冷漠的 5 | 将文本重写得充满鼓励、肯定和温和。使用积极的框架，聚焦于宏大愿景和个人意义。承认并尊重接收者的价值观和感受。使用柔和、非对抗性的语言，避免直接、苛刻的批评。目标是维护和谐并激发成长。 |
| **ESTJ** | 结构、事实与责任 | 清晰的指令、事实、数据、计划、步骤、责任、效率、可行的 11 | 模糊的想法、抽象理论、情感论证、不切实际、绕圈子 11 | 将文本重写为一份结构清晰、基于事实的行动计划。明确定义目标、步骤和预期结果。使用直接、果断的语言，避免任何模糊不清或纯粹基于情感的论述。确保每一句话都服务于推动任务高效完成。 |
| **ENTP** | 探索可能性与智力辩论 | 可能性、视角、辩论、创新、逻辑、大局观、挑战现状、替代方案 17 | 情绪化、个人攻击、墨守成规、细节执行、不容置疑的结论 17 | 将文本重写为开放性的、激发讨论的风格。鼓励对不同可能性的探索，并以逻辑和理性的方式呈现观点。可以适度引入挑战性的视角，但避免使用个人化或情绪化的语言。聚焦于宏大的概念和创新的解决方案，而不是具体的执行细节。 |

(注：完整的 16 种人格类型的矩阵将作为附录提供给开发团队，其内容将综合所有相关研究资料 4 进行填充。)  
---

## **5.0 用户体验 (UX) 与用户界面 (UI) 设计**

本章节将功能性需求转化为具体的用户体验方案，并严格遵循用户提出的“美学至上”的设计原则。

### **5.1 设计哲学：“美学极简主义”**

* **核心原则：**  
  * **清晰至上：** 界面上的每一个元素都必须服务于核心用户流程。任何非必要的装饰或功能都将被移除。  
  * **慷慨的留白：** 利用负空间来营造一个平静、专注、无干扰的使用环境。  
  * **优雅的字体：** 选择一款清晰、现代且高度易读的字体作为设计的基石。  
  * **精妙的动画：** 微交互和过渡效果应平滑、细腻，旨在提供反馈而非分散用户注意力。  
  * **克制的调色板：** 采用简单、高级的配色方案（例如，单色系搭配一个强调色），以强化极简主义的美学感受。  
* **设计灵感：** 整体设计风格应从 Dribbble 等平台上展示的现代、简洁的 Web 应用界面中汲取灵感 13。

### **5.2 用户流程图**

一个可视化的用户流程图对于理解用户从进入到完成目标的完整路径至关重要，它有助于识别潜在的摩擦点并进行优化 15。

1. **\[开始\]** 用户访问单页面应用。  
2. 用户从人格选择器中选择一个目标 MBTI 类型。 \-\> 界面更新，显示当前选择。  
3. 用户在输入框中键入或粘贴原始信息。  
4. 用户点击“转换”按钮。 \-\> 按钮进入加载状态。  
5. **(API 调用)** 应用向 Gemini API 发送请求。  
6. **(API 响应)** 应用接收到转换后的文本。 \-\> 加载状态结束。  
7. 输出区域被填充上新文本。  
8. 用户点击“复制”按钮。 \-\> 文本被复制到剪贴板，并显示成功反馈。  
9. **\[结束\]** 用户离开页面，或点击“清空”按钮开始新的流程。

### **5.3 线框图与界面描述**

* **主界面:**  
  * 采用单页布局，整体结构可能是一个三栏式设计（垂直或水平）。  
  * **区域一：MBTI 选择器：** 一个 4x4 的卡片网格，每张卡片代表一种人格类型，清晰地标示其四字母代码（如 “INTJ”）。鼠标悬停时有微妙的视觉反馈。被选中的卡片有独特的边框或背景色，以示区分。  
  * **区域二：输入/输出区：**  
    * 上半部分：一个简洁的文本输入框，带有占位符提示，如“在此输入您的原始信息...”。  
    * 中间：一个醒目的“转换”按钮。  
    * 下半部分：一个只读的文本输出框，初始状态为空或显示提示语，如“适配后的信息将显示在此处。”。“复制”和“清空”按钮位于此区域。  
* **信息/关于弹窗 (通过一个信息图标访问):**  
  * 一个简单的模态框，简要介绍应用的用途，并包含一个关于 AI 生成建议局限性的免责声明，以及一个了解更多 MBTI 理论的外部链接。这有助于管理用户期望，明确工具的边界。

---

## **6.0 非功能性需求 (NFRs)**

非功能性需求定义了系统的质量属性。对于一个纯客户端应用，这些需求对于确保专业、可靠的用户体验至关重要 23。

### **6.1 性能**

* **NFR-1.1 (加载时间):** 在标准宽带连接下，应用的首次加载时间**必须**在 2 秒以内。这将通过 Next.js 的代码分割、静态生成等优化手段实现。  
* **NFR-1.2 (响应速度):** 用户的 UI 交互（如点击按钮、输入文字）**必须**提供即时反馈（响应时间 \< 100毫秒）。  
* **NFR-1.3 (API 延迟):** 尽管 Gemini API 的响应时间是外部依赖，但 UI **必须**优雅地处理等待周期（见 FR-2.5），确保用户感知性能的流畅。

### **6.2 可用性与无障碍性**

* **NFR-2.1 (直观性):** 新用户应能在无任何指引的情况下，在 30 秒内理解并使用应用的核心功能。  
* **NFR-2.2 (无障碍性):** 应用**必须**符合 Web 内容无障碍指南 (WCAG) 2.1 AA 级别标准。这包括完整的键盘可导航性、足够的色彩对比度以及对屏幕阅读器的支持（通过 ARIA 标签）。

### **6.3 兼容性**

* **NFR-3.1 (浏览器支持):** 应用**必须**在以下主流常青浏览器的最新两个版本上正常运行并保持预期布局：Google Chrome、Mozilla Firefox、Apple Safari 和 Microsoft Edge。  
* **NFR-3.2 (响应式设计):** 应用**必须**是完全响应式的，能够在桌面、平板和移动设备等常见断点下提供良好的使用体验。

### **6.4 安全性 (客户端)**

用户指定的“纯前端方案”在处理需要保密的 API 密钥时存在一个重大的安全隐患。任何存储在客户端 JavaScript 代码中的密钥都可以被轻易地从网页源代码中提取，这将导致密钥被滥用，产生不可预估的成本和安全风险。因此，必须对原架构进行调整。

* **NFR-4.1 (API 密钥管理):** Gemini API 密钥**绝不能**在客户端暴露。Next.js 应用**必须**使用其 API 路由 (API Route) 功能。该功能本质上是一个 Serverless 函数，将作为前端和 Gemini API 之间的安全代理。前端应用将调用这个内部的 API 路由，然后由该路由在服务端环境中使用存储在环境变量中的密钥，安全地调用 Gemini API。这是对原始架构至关重要的修正。  
* **NFR-4.2 (输入净化):** 所有用户输入都应被视为不可信。尽管在此应用场景下风险较低，但仍应执行基本的输入净化，以防止潜在的注入攻击。

---

## **7.0 V1.0 发布范围与未来路线图**

清晰地界定发布范围是防止“范围蔓延”并确保项目按时、聚焦交付的最有效方法之一 1。同时，为产品的未来发展提供一个清晰的愿景，也能更好地指导长期决策 28。

### **7.1 本次发布 (V1.0) 范围之内**

* 第 3.0 章节中列出的所有功能性需求。  
* 为全部 16 种 MBTI 类型填充完整的 AI 提示词矩阵。  
* 一个完全响应式的单页面 Web 应用。  
* 通过 Next.js API 路由实现安全的 API 密钥处理。  
* 根据用户查询的语言，应用界面和 AI 提示词将以中文为默认语言。

### **7.2 明确排除在 V1.0 范围之外**

* **用户账户与认证：** 无需登录或创建用户个人资料。  
* **对话历史记录：** 应用是无状态的，每次转换都是独立的。  
* **多语言支持：** V1.0 仅支持中文。  
* **语气/风格调整器：** 除了目标 MBTI 类型外，不提供“更正式”、“更随意”等风格选项。  
* **原生移动应用：** 仅作为 Web 应用发布。  
* **后端数据库：** 不存储任何用户数据。

### **7.3 未来可能的增强功能 (产品路线图)**

* **V1.1 \- “教育家”版本:**  
  * **特性：** “解释变化”功能 \- 提供一个选项，让用户可以看到 AI *为什么*这样重写文本，高亮关键修改并将其与目标 MBTI 的沟通偏好相关联（呼应 2.2.3 节的“脚手架”概念）。  
  * **特性：** 用户反馈机制 (👍/👎)，用于收集关于转化质量的数据，以迭代优化提示词。  
* **V1.2 \- “多语者”版本:**  
  * **特性：** 支持多语言，包括 UI 界面和 AI 转换功能（例如，增加英语支持）。  
* **V2.0 \- “专业版”:**  
  * **特性：** 引入用户账户系统，以保存转换历史记录。  
  * **特性：** 可自定义的“沟通对象”档案，方便用户保存特定的沟通目标（例如，“我的老板 \- ESTJ”，“我的伴侣 \- INFP”）。  
  * **特性：** 通过浏览器扩展，与 Slack、邮件客户端等平台进行集成。

#### **Works cited**

1. What is a Product Requirements Document (PRD)? \- Atlassian, accessed September 10, 2025, [https://www.atlassian.com/agile/product-management/requirements](https://www.atlassian.com/agile/product-management/requirements)  
2. The Only Product Requirements Document (PRD) Template You Need, accessed September 10, 2025, [https://productschool.com/blog/product-strategy/product-template-requirements-document-prd](https://productschool.com/blog/product-strategy/product-template-requirements-document-prd)  
3. Product Requirements Document Template Example (Updated), accessed September 10, 2025, [https://blog.buildbetter.ai/product-requirements-document-template-example-updated/](https://blog.buildbetter.ai/product-requirements-document-template-example-updated/)  
4. INTJ Communication \- Personality Central, accessed September 10, 2025, [https://personality-central.com/personality\_types/intj-communication/](https://personality-central.com/personality_types/intj-communication/)  
5. INFP Communication \- Personality Central, accessed September 10, 2025, [https://personality-central.com/personality\_types/infp-communication/](https://personality-central.com/personality_types/infp-communication/)  
6. Product requirements template | Confluence \- Atlassian, accessed September 10, 2025, [https://www.atlassian.com/software/confluence/templates/product-requirements](https://www.atlassian.com/software/confluence/templates/product-requirements)  
7. How to Write a Product Requirements Document — With Examples | by Calvin Lee \- Medium, accessed September 10, 2025, [https://medium.com/design-bootcamp/how-to-write-a-product-requirements-document-with-examples-442d095de4dd](https://medium.com/design-bootcamp/how-to-write-a-product-requirements-document-with-examples-442d095de4dd)  
8. Atlassian's PRD Template \- GrowthX, accessed September 10, 2025, [https://growthx.club/template/atlassians-prd-template](https://growthx.club/template/atlassians-prd-template)  
9. Free Design templates | Confluence \- Atlassian, accessed September 10, 2025, [https://www.atlassian.com/software/confluence/templates/categories/design](https://www.atlassian.com/software/confluence/templates/categories/design)  
10. INFP Communication Skills \- Humanmetrics, accessed September 10, 2025, [https://www.humanmetrics.com/personality/infp-communication-style](https://www.humanmetrics.com/personality/infp-communication-style)  
11. ESTJ Communication \- Personality Central, accessed September 10, 2025, [https://personality-central.com/personality\_types/estj-communication/](https://personality-central.com/personality_types/estj-communication/)  
12. How To Support ESTJ Types In The Workplace \- TestGorilla, accessed September 10, 2025, [https://www.testgorilla.com/blog/support-estj-personalities-workplace/](https://www.testgorilla.com/blog/support-estj-personalities-workplace/)  
13. Minimal Web App \- Dribbble, accessed September 10, 2025, [https://dribbble.com/tags/minimal-web-app](https://dribbble.com/tags/minimal-web-app)  
14. Minimalist App Design \- Dribbble, accessed September 10, 2025, [https://dribbble.com/tags/minimalist-app-design](https://dribbble.com/tags/minimalist-app-design)  
15. User flow map: 15 tips for best UX design \- FlowMapp, accessed September 10, 2025, [https://www.flowmapp.com/features/user-flow-map-15-tips-for-best-ux-design](https://www.flowmapp.com/features/user-flow-map-15-tips-for-best-ux-design)  
16. ISFJ Communication \- Personality Central, accessed September 10, 2025, [https://personality-central.com/personality\_types/isfj-communication/](https://personality-central.com/personality_types/isfj-communication/)  
17. ENTP Communication \- Personality Central, accessed September 10, 2025, [https://personality-central.com/personality\_types/entp-communication/](https://personality-central.com/personality_types/entp-communication/)  
18. ESTP Communication \- Personality Central, accessed September 10, 2025, [https://personality-central.com/personality\_types/estp-communication/](https://personality-central.com/personality_types/estp-communication/)  
19. personality-central.com, accessed September 10, 2025, [https://personality-central.com/personality\_types/intj-communication/\#:\~:text=INTJ%20Communication%3A%20Communicating%20with%20them\&text=When%20you%20first%20communicate%20with,task%20as%20effectively%20and%20efficiently.](https://personality-central.com/personality_types/intj-communication/#:~:text=INTJ%20Communication%3A%20Communicating%20with%20them&text=When%20you%20first%20communicate%20with,task%20as%20effectively%20and%20efficiently.)  
20. ESTP Personality Type: Entrepreneur MBTI (2024 Guide) \- HiPeople, accessed September 10, 2025, [https://www.hipeople.io/glossary/estp-personality-type-mbti](https://www.hipeople.io/glossary/estp-personality-type-mbti)  
21. 15 Powerful User Flow Examples To Upgrade Your UX | Userflow Blog, accessed September 10, 2025, [https://www.userflow.com/blog/15-user-flow-examples-the-ultimate-guide-on-the-user-journey](https://www.userflow.com/blog/15-user-flow-examples-the-ultimate-guide-on-the-user-journey)  
22. User Flow Analysis \- A Step-by-Step Guide 2025 \- UXCam, accessed September 10, 2025, [https://uxcam.com/blog/user-flow-analysis/](https://uxcam.com/blog/user-flow-analysis/)  
23. Nonfunctional Requirements: Examples, Types and Approaches \- AltexSoft, accessed September 10, 2025, [https://www.altexsoft.com/blog/non-functional-requirements/](https://www.altexsoft.com/blog/non-functional-requirements/)  
24. NFRs: What is Non Functional Requirements (Example & Types) \- BrowserStack, accessed September 10, 2025, [https://www.browserstack.com/guide/non-functional-requirements-examples](https://www.browserstack.com/guide/non-functional-requirements-examples)  
25. Functional and Non-Functional Requirements: The Ultimate Checklist with Examples \- Medium, accessed September 10, 2025, [https://medium.com/@growsolutions/functional-and-non-functional-requirements-the-ultimate-checklist-with-examples-cde16aba33d7](https://medium.com/@growsolutions/functional-and-non-functional-requirements-the-ultimate-checklist-with-examples-cde16aba33d7)  
26. Non Functional Requirements Checklist \- DOOR3, accessed September 10, 2025, [https://www.door3.com/blog/non-functional-requirements-checklist](https://www.door3.com/blog/non-functional-requirements-checklist)  
27. Complete Guide to Non-Functional Testing: 51 Types, Examples & Applications \- TestRail, accessed September 10, 2025, [https://www.testrail.com/blog/non-functional-testing/](https://www.testrail.com/blog/non-functional-testing/)  
28. 8 Best Product Roadmap Examples for SaaS Startups, accessed September 10, 2025, [https://www.featurebase.app/blog/product-roadmap-examples](https://www.featurebase.app/blog/product-roadmap-examples)  
29. Product Roadmap Types & Examples for Your Next Project \- Adobe for Business, accessed September 10, 2025, [https://business.adobe.com/blog/basics/learn-about-product-roadmap-examples](https://business.adobe.com/blog/basics/learn-about-product-roadmap-examples)  
30. Product Roadmap Guide: What is it & How to Create One \- Atlassian, accessed September 10, 2025, [https://www.atlassian.com/agile/product-management/product-roadmaps](https://www.atlassian.com/agile/product-management/product-roadmaps)