# 门店盈利数学模型

这是一个适合手机和电脑浏览器直接打开的静态网页工具，主文件是 [index.html](C:/Users/zhbho/OneDrive/Desktop/math%20model%20bsf/index.html)。

它支持 3 个核心计算：

1. 输入上班人数、营业额，得到人效。
2. 输入营业额和原料成本，得到毛利额与毛利率。
3. 输入营业额、人效、毛利率、电费和房租，判断是否盈利，并计算保本营业额。

## 在线部署

这个项目已经适合直接部署到 `GitHub Pages`。

### 方法一：网页上传到 GitHub

1. 在 GitHub 新建一个仓库。
2. 把本目录里的 `index.html`、`README.md` 和 `.nojekyll` 上传到仓库根目录。
3. 打开仓库页面，进入 `Settings` -> `Pages`。
4. 在 `Build and deployment` 里选择 `Deploy from a branch`。
5. 分支选 `main`，目录选 `/root`。
6. 保存后等待 1 到 2 分钟。
7. 访问类似 `https://你的用户名.github.io/仓库名/` 的地址。

### 方法二：用 git 命令上传

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

然后再去 GitHub 仓库里开启 `Pages`。

## 本地使用

- 电脑上直接双击 `index.html`
- 手机上用浏览器打开 `index.html`
- 也可以放到任何静态托管平台，比如 `Netlify`、`Vercel`、`Cloudflare Pages`

## 公式说明

### 1. 出勤折算

- 4 到 6 小时算 `0.5` 人天
- 8 到 12 小时算 `1` 人天

```text
上班人数之和 = 0.5 × 半天人数 + 1 × 全天人数
```

### 2. 人效

```text
人效 = 营业额 / 上班人数之和
```

### 3. 毛利

```text
毛利额 = 营业额 - 成本价
毛利率 = (营业额 - 成本价) / 营业额
```

### 4. 利润

默认假设：

- 人均月工资 `6300`
- 人均月休 `4` 天
- 当月 `30` 天
- 房租 `49000`
- 电费 `11000`

```text
人均月上班天数 = 当月天数 - 月休天数
人均日工资 = 人均月工资 / 人均月上班天数
折算出勤人数 = 营业额 / 人效
人工成本 = 折算出勤人数 × 人均日工资
利润 = 毛利额 - 人工成本 - 电费 - 房租
```

### 5. 保本营业额

```text
保本营业额 = 固定成本 / (毛利率 - 人均日工资 / 人效)
```

### 6. 保本毛利率

```text
保本毛利率 = 固定成本 / 营业额 + 人均日工资 / 人效
```

## 参考营业额区间

你提供的区间为：

- 周一到周四：`5000 ~ 6000/天`
- 周五：`7500 ~ 9500/天`
- 周末：`12000 ~ 16000/天`

估算结果：

- 周营业额约 `51500 ~ 65500`
- 月营业额约 `223768 ~ 284598`

## 备注

仓库里还保留了一个 [model.py](C:/Users/zhbho/OneDrive/Desktop/math%20model%20bsf/model.py)，它是同一套公式的 Python 版本；但如果你的目标是给别人访问，优先使用网页版本就够了。
