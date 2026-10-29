(() => {
  const C = OPS.C;
  const pad = n => String(n).padStart(2, '0');
  const qs = selector => document.querySelector(selector);
  const qsa = selector => [...document.querySelectorAll(selector)];
  const state = { type: '', issueEn: '', issueZh: '', statusEn: '', statusZh: '', photo: '' };
  const plant = qs('#plant');
  const material = qs('#material');
  const date = qs('#date');
  const time = qs('#time');
  const remark = qs('#remark');
  const submit = qs('#submit');
  const isChinese = OPS.getLanguage() === 'zh';
  const guidance = document.createElement('p');

  guidance.className = 'form-guidance';
  guidance.setAttribute('role', 'status');
  guidance.setAttribute('aria-live', 'polite');
  submit.insertAdjacentElement('beforebegin', guidance);

  C.plants.forEach(value => plant.add(new Option(value, value)));
  C.materials.forEach(value => material.add(new Option(value, value)));
  document.querySelectorAll('select option[value=""]').forEach(option => {
    option.textContent = isChinese ? '選擇' : 'Select';
  });

  Object.entries(C.types).forEach(([id, type]) => {
    typeGrid.insertAdjacentHTML('beforeend', `<button type="button" class="choice type-choice" data-id="${id}" aria-pressed="false"><span class="bilingual-en">${type.en}</span><span class="bilingual-zh" lang="zh-HK">${type.zh}</span></button>`);
  });

  const now = new Date();
  date.value = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  date.max = date.value;
  time.value = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

  function getMissingFields(validIncident) {
    const missing = [];
    if (!plant.value) missing.push(isChinese ? '廠房' : 'Plant');
    if (!material.value) missing.push(isChinese ? '物料' : 'Material');
    if (!date.value || !time.value) {
      missing.push(isChinese ? '事發日期及時間' : 'Incident date and time');
    } else if (!validIncident) {
      missing.push(isChinese ? '有效事發時間' : 'A valid incident time');
    }
    if (!state.type) missing.push(isChinese ? '問題類別' : 'Issue type');
    else if (!state.issueEn) missing.push(isChinese ? '相關問題' : 'Related issue');
    if (!state.statusEn) missing.push(isChinese ? '運作情況' : 'Operating status');
    if ((state.issueEn === 'Other' || state.issueEn === 'Unable to Identify') && !remark.value.trim()) {
      missing.push(isChinese ? '情況說明' : 'Description');
    }
    return missing;
  }

  function update() {
    const incident = date.value && time.value ? `${date.value}T${time.value}` : '';
    const validIncident = Boolean(incident) && new Date(incident) <= new Date(Date.now() + 60000);
    const missing = getMissingFields(validIncident);

    submit.disabled = missing.length > 0;
    guidance.textContent = missing.length
      ? isChinese ? `提交前請完成：${missing.join(' · ')}。` : `To submit, complete: ${missing.join(' · ')}.`
      : isChinese ? '所有必填項目已完成。' : 'All required fields are complete.';
    guidance.classList.toggle('ready', missing.length === 0);

    preview.classList.toggle('show', Boolean(plant.value || state.type));
    const notSelected = isChinese ? '未選擇' : 'Not selected';
    pvPlant.textContent = plant.value || notSelected;
    pvMaterial.textContent = material.value || notSelected;
    pvTime.textContent = incident && validIncident ? OPS.fmt(incident) : notSelected;
    pvType.textContent = state.type ? (isChinese ? C.types[state.type].zh : C.types[state.type].en) : notSelected;
    pvIssue.textContent = state.issueEn ? (isChinese ? state.issueZh : state.issueEn) : notSelected;
    pvStatus.textContent = state.statusEn ? (isChinese ? state.statusZh : state.statusEn) : notSelected;
    const descriptionRequired = state.issueEn === 'Other' || state.issueEn === 'Unable to Identify';
    remarkLabel.innerHTML = `${isChinese ? '情況說明' : 'What happened?'} ${descriptionRequired ? '<span class="required">*</span>' : `<span class="sub">${isChinese ? '選填' : 'Optional'}</span>`}`;
    remarkLabel.htmlFor = 'remark';
    remark.required = descriptionRequired;
  }

  qsa('.type-choice').forEach(button => {
    button.onclick = () => {
      qsa('.type-choice, .option-choice').forEach(choice => {
        choice.classList.remove('selected');
        choice.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('selected');
      button.setAttribute('aria-pressed', 'true');
      state.type = button.dataset.id;
      state.issueEn = state.issueZh = '';

      const type = C.types[state.type];
      const optionName = isChinese
        ? state.type === 'it' ? '相關系統' : '相關問題'
        : state.type === 'it' ? 'Related system' : 'Related issue';
      optionLabel.innerHTML = `${optionName} <span class="required">*</span>`;
      optionGrid.innerHTML = type.options.map(([en, zh]) => `<button type="button" class="choice option-choice" data-en="${en}" data-zh="${zh}" aria-pressed="false"><span class="bilingual-en">${en}</span><span class="bilingual-zh" lang="zh-HK">${zh}</span></button>`).join('');
      optionWrap.classList.add('show');

      qsa('.option-choice').forEach(option => {
        option.onclick = () => {
          qsa('.option-choice').forEach(choice => {
            choice.classList.remove('selected');
            choice.setAttribute('aria-pressed', 'false');
          });
          option.classList.add('selected');
          option.setAttribute('aria-pressed', 'true');
          state.issueEn = option.dataset.en;
          state.issueZh = option.dataset.zh;
          update();
        };
      });
      update();
    };
  });

  qsa('#statusGrid .choice').forEach(button => {
    button.type = 'button';
    button.setAttribute('aria-pressed', 'false');
    button.onclick = () => {
      qsa('#statusGrid .choice').forEach(choice => {
        choice.classList.remove('selected');
        choice.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('selected');
      button.setAttribute('aria-pressed', 'true');
      state.statusEn = button.dataset.en;
      state.statusZh = button.dataset.zh;
      update();
    };
  });

  [plant, material, date, time].forEach(field => field.onchange = update);
  remark.oninput = update;
  take.onclick = () => camera.click();
  choose.onclick = () => gallery.click();

  function selectedPhoto(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    state.photo = file.name;
    photoImg.src = URL.createObjectURL(file);
    photoName.textContent = file.name;
    photoPreview.classList.add('show');
  }

  camera.onchange = gallery.onchange = selectedPhoto;
  remove.onclick = () => {
    camera.value = gallery.value = '';
    state.photo = '';
    photoImg.removeAttribute('src');
    photoName.textContent = '';
    photoPreview.classList.remove('show');
  };

  submit.onclick = async () => {
    if (submit.disabled || !await OPS.latest()) return;

    const records = OPS.get();
    const submittedAt = new Date();
    const ticket = `${plant.value}-${submittedAt.getFullYear()}${pad(submittedAt.getMonth() + 1)}${pad(submittedAt.getDate())}-${String(Math.floor(Math.random() * 900) + 100)}`;
    records.unshift({
      ticket,
      plant: plant.value,
      material: material.value,
      incident: `${date.value}T${time.value}`,
      type: state.type,
      typeEn: C.types[state.type].en,
      typeZh: C.types[state.type].zh,
      issueEn: state.issueEn,
      issueZh: state.issueZh,
      statusEn: state.statusEn,
      statusZh: state.statusZh,
      remark: remark.value.trim(),
      photo: state.photo,
      workflowStatus: 'Reported',
      workflowStatusZh: '已報告',
      submitted: submittedAt.toISOString(),
      updated: submittedAt.toISOString()
    });
    OPS.set(records);
    location.href = `success.html?ticket=${encodeURIComponent(ticket)}`;
  };

  update();
})();
